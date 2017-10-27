(function () {
  'use strict';

  // Tasks controller
  angular
    .module('tasks')
    .controller('TasksController', TasksController);

  TasksController.$inject = ['$scope', '$state', '$window', 'Authentication', 'taskResolve'];

  function TasksController ($scope, $state, $window, Authentication, task) {
    var vm = this;

    vm.authentication = Authentication;
    vm.task = task;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Task
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.task.$remove($state.go('tasks.list'));
      }
    }

    // Save Task
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.taskForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.task._id) {
        vm.task.$update(successCallback, errorCallback);
      } else {
        vm.task.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('tasks.view', {
          taskId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }

    //My stuff below
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
  }
}());
