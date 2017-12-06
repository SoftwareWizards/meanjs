(function () {
  'use strict';

  // Tasks controller
  angular
    .module('tasks')
    .controller('TasksController', TasksController);

  TasksController.$inject = ['$scope', '$state', 'taskResolve', '$window', 'Authentication', 'Notification'];

  function TasksController ($scope, $state, task, $window, Authentication, Notification) {
    var vm = this;

    vm.authentication = Authentication;
    vm.task = task;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    //adds new post
	$scope.posts = [

		];
  //filtered posts declaration

  $scope.filteredPosts = $scope.posts;

	$scope.addPost = function(){
		$scope.posts.push({name: $scope.name, type: $scope.type, level: $scope.level, priority: $scope.priority, compensation: $scope.compensation, paymentId: $scope.paymentId, user: $scope.user  });
		$scope.name = '';
		$scope.type = '';
		$scope.level = '';
		$scope.priority = '';
    $scope.compensation = '';
    $scope.paymentId = '';
	}

    // Remove existing Task
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.task.$remove($state.go('tasks.list'));
      }
    }

    // Save Article
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.taskForm');
        return false;
      }

      console.log(vm.task);

      // Create a new article, or update the current instance
      vm.task.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('tasks.view', {taskId: res._id}); // should we send the User to the list or the updated Article's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Article saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Article save error!' });
        vm.error = res.data.message;
      }
    }

  //Returns the listing in the filtered posts array pointed to by the specified index
  $scope.fListingAt = function(index){
    return $scope.filteredPosts[index];
  }

	//Remove row function

	$scope.removeRow = function(name){
		var index = -1;
		var comArr = eval( $scope.posts );
		for( var i = 0; i < comArr.length; i++ ) {
			if( comArr[i].name === name ) {
				index = i;
				break;
			}
		}
		if( index === -1 ) {
			alert( "Entry Deleted" );
		}
		$scope.posts.splice( index, 1 );
	};

    $scope.$on('$viewContentLoaded', function(){
      // Run after view loaded.
    //$scope.init = function () {
    paypal.Button.render({

      client: {
        sandbox:    'AZAkAETjtRkBnDahhdZbAZawBk5LvHNGjTga_PnOqSVBx_B58rB2gkrmxiGDWd6aRt4JdZ0oxuOtsFiu', // from https://developer.paypal.com/developer/applications/
        production: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'  // from https://developer.paypal.com/developer/applications/
      },
      env: 'sandbox', // sandbox Or 'production',

      commit: true, // Show a 'Pay Now' button

      style: {
        label: 'pay',  // checkout | credit | pay | buynow | generic
        size:   'responsive', // tiny | small | medium | large | responsive
        color:  'silver',   // gold | blue | silver | black | orange
        shape:  'pill'    // pill | rect
      },

      payment: function(data, actions) {
        /*
         * Set up the payment here
         */

        var compensation = document.getElementById('compensation').value;
        var name = document.getElementById('name').value;
        var type = document.getElementById('type').value;
        return actions.payment.create({

          transactions: [
            {
              amount: {
                total: compensation,
                currency: 'USD'
              },
              item_list: {
                items: [
                  {
                    name: name,
                    description: type,
                    quantity: 1,
                    currency: 'USD',
                    price: compensation
                  }
                ]
              }
            }
          ]
        });
      },

      onAuthorize: function(data, actions) {
        /*
         * Execute the payment here
         */
        return actions.payment.execute().then(function(response) {
          console.log('The payment was completed!');
          console.log(response);
          vm.task.paymentId = response['id'];
          console.log(vm.task.paymentId);
          document.getElementById('taskSubmit').click();
        });
      },

      onCancel: function(data, actions) {
        /*
         * Buyer cancelled the payment
         */
        console.log('The payment was cancelled!');
      },

      onError: function(err) {
        /*
         * An error occurred during the transaction
         */
        console.log('The payment failed!');
      }

    }, '#paypal-button');
  });
  }
}());
