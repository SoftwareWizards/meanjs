(function () {
  'use strict';

  angular
    .module('tasks')
    .controller('TaskController', TaskController);

  TaskController.$inject = ['$scope', '$state', 'TasksService', '$window', 'Occupation', 'taskResolve', 'Notification'];

  function TaskController($scope, $state, TasksService, $window, Occupation, task, Notification) {
    var vm = this;

    vm.occupation = Occupation;
    vm.task = task;
    vm.save = save;
    vm.update = update;
    vm.remove = remove;

    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.taskForm');
        return false;
      }

      TasksService.taskBuild(vm.details)
        .then(onTaskBuildSuccess)
        .catch(onTaskBuildError);
    }

    function update(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.taskForm');

        return false;
      }

      var task = vm.task;

      task.$update(function () {
        $state.go('builder.task', {
          taskId: task._id
        });
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Updated successfully!' });
      }, function (errorResponse) {
        Notification.error({ message: errorResponse.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Update error!' });
      });
    }

    function remove(task) {
      if ($window.confirm('Are you sure you want to delete?')) {
        if (task) {
          task.$remove();

          vm.tasks.splice(vm.tasks.indexOf(task), 1);
          Notification.success('Deleted successfully!');
        } else {
          vm.user.$remove(function () {
            $state.go('builder.tasks');
            Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Deleted successfully!' });
          });
        }
      }
    }

    function onTaskBuildSuccess(response) {
      // If successful we assign the response to the global task model
      vm.occupation.task = response;
      Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Build successful!' });
      // And redirect to the previous or home page
      $state.go($state.previous.state.name || 'home', $state.previous.params);
    }

    function onTaskBuildError(response) {
      Notification.error({ message: response.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Build Error!', delay: 6000 });
    }

  }
}());
