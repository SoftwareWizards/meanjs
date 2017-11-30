(function () {
  'use strict';

  // Tasks controller
  angular
    .module('tasks')
    .controller('TasksController', TasksController);

  TasksController.$inject = ['$scope', '$state', '$window'];

  function TasksController ($scope, $state, $window, task) {
    var vm = this;

    //adds new post
	$scope.posts = [

		];
  //filtered posts declaration

  $scope.filteredPosts = $scope.posts;

	$scope.addPost = function(){
		$scope.posts.push({name: $scope.name, type: $scope.type, level: $scope.level, priority: $scope.priority});
		$scope.name = '';
		$scope.type = '';
		$scope.level = '';
		$scope.priority = '';


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

    $scope.init = function () {
    paypal.Button.render({

      client: {
        sandbox:    'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R', // from https://developer.paypal.com/developer/applications/
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
        return actions.payment.create({

          transactions: [
            {
              amount: {
                total: compensation,
                currency: 'USD'
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
          window.alert('Payment Complete!');
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
  };
  }
}());
