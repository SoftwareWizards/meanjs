(function () {
  'use strict';

  // Builders controller
  angular
    .module('builders')
    .controller('BuildersController', BuildersController);

  BuildersController.$inject = ['$scope', '$state', '$window', 'Authentication', 'builderResolve'];

  function BuildersController($scope, $state, $window, Authentication, builder) {
    var vm = this;

    vm.authentication = Authentication;
    vm.builder = builder;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Builder
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.builder.$remove($state.go('builders.list'));
      }
    }

    // Save Builder
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.builderForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.builder._id) {
        vm.builder.$update(successCallback, errorCallback);
      } else {
        vm.builder.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('builders.view', {
          builderId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
