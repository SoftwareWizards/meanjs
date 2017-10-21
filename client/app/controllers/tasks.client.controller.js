angular.module('tasks').controller('TasksController', ['$scope', '$location', '$stateParams', '$state', 'Tasks',
  function($scope, $location, $stateParams, $state, Tasks){
    $scope.find = function() {
      /* set loader*/
      $scope.loading = true;

      /* Get all the tasks, then bind it to the scope */
      Tasks.getAll().then(function(response) {
        $scope.loading = false; //remove loader
        $scope.tasks = response.data;
      }, function(error) {
        $scope.loading = false;
        $scope.error = 'Unable to retrieve tasks!\n' + error;
      });
    };

    $scope.findOne = function() {
      debugger;
      $scope.loading = true;

      /*
        Take a look at 'list-tasks.client.view', and find the ui-sref attribute that switches the state to the view
        for a single task. Take note of how the state is switched:

          ui-sref="tasks.view({ taskId: task._id })"

        Passing in a parameter to the state allows us to access specific properties in the controller.

        Now take a look at 'view-task.client.view'. The view is initialized by calling "findOne()".
        $stateParams holds all the parameters passed to the state, so we are able to access the id for the
        specific task we want to find in order to display it to the user.
       */

      var id = $stateParams.taskId;

      Tasks.read(id)
              .then(function(response) {
                $scope.task = response.data;
                $scope.loading = false;
              }, function(error) {
                $scope.error = 'Unable to retrieve task with id "' + id + '"\n' + error;
                $scope.loading = false;
              });
    };

    $scope.create = function(isValid) {
      $scope.error = null;

      /*
        Check that the form is valid. (https://github.com/paulyoder/angular-bootstrap-show-errors)
       */
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'articleForm');

        return false;
      }

      /* Create the task object */
      var task = {
        name: $scope.name,
        code: $scope.code,
        address: $scope.address
      };

      /* Save the article using the Tasks factory */
      Tasks.create(task)
              .then(function(response) {
                //if the object is successfully saved redirect back to the list page
                $state.go('tasks.list', { successMessage: 'Task successfully created!' });
              }, function(error) {
                //otherwise display the error
                $scope.error = 'Unable to save task!\n' + error;
              });
    };

    $scope.update = function(isValid) {
      /*
        Fill in this function that should update a task if the form is valid. Once the update has
        successfully finished, navigate back to the 'task.list' state using $state.go(). If an error
        occurs, pass it to $scope.error.
       */
	   $scope.error = null;

	   //Check that the form is valid
	   if(!isValid) {
		 $scope.broadcast('show-errors-check-validity', 'articleForm');
		 return false;
	   }

	   var id = $stateParams.taskId;

	   //Create task object
	   var task = {
        name: $scope.name,
        code: $scope.code,
        address: $scope.address
      };

	   $scope.loading = true;

	   //Update using tasks factory
	   Tasks.update(id, task)
              .then(function(response) {
				//if successful redirect to list page
                $state.go('tasks.list', { successMessage: 'Task successfully updated!' });
				$scope.loading = false;
				//otherwise display error
              }, function(error) {
                $scope.error = 'Unable to update task!\n' + error;
				$scope.loading = false;
              });

    };

    $scope.remove = function() {
      /*
        Implement the remove function. If the removal is successful, navigate back to 'task.list'. Otherwise,
        display the error.
       */
	   $scope.error = null;

	   var id = $stateParams.taskId;

	   Tasks.delete(id)
	           .then(function(response) {
				//if successful redirect to list page
                $state.go('tasks.list', { successMessage: 'Task successfully deleted!' });
				$scope.loading = false;
				//otherwise display error
              }, function(error) {
                $scope.error = 'Unable to delete task!\n' + error;
				$scope.loading = false;
              });
    };

    /* Bind the success message to the scope if it exists as part of the current state */
    if($stateParams.successMessage) {
      $scope.success = $stateParams.successMessage;
    }

  }
]);
