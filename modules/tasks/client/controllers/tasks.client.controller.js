/*
(function () {
  'use strict';

  // Tasks controller
  angular
    .module('tasks')
    .controller('TasksController', TasksController);
  //added Upload and $timeout to inject

  TasksController.$inject = ['$scope', '$state', '$window', 'Authentication', 'taskResolve', 'Upload', '$timeout'];

  function TasksController ($scope, $state, $window, Authentication, task, Upload, $timeout) {
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

    //upload controller below

    $scope.onFileSelect = function(image) {
      $scope.uploadInProgress = true;
      $scope.uploadProgress = 0;

      if (angular.isArray(image)) {
        image = image[0];
      }

      $scope.upload = $upload.upload({
        url: '/api/tasks/upload',
        method: 'POST',
        data: {
          type: 'task'
        },
        file: image
      }).progress(function(event) {
        $scope.uploadProgress = Math.floor(event.loaded / event.total);
        $scope.$apply();
      }).success(function(data, status, headers, config) {
        AlertService.success('Document uploaded!');
      }).error(function(err) {
        $scope.uploadInProgress = false;
        AlertService.error('Error uploading file: ' + err.message || err);
      });
    };



  }


}());
*/
