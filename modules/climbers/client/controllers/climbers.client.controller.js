(function () {
  'use strict';

  // Climbers controller
  angular
    .module('climbers')
    .controller('ClimbersController', ClimbersController);

  ClimbersController.$inject = ['$scope', '$state', '$window', 'Authentication', 'climberResolve'];

  function ClimbersController ($scope, $state, $window, Authentication, climber) {
    var vm = this;

    vm.authentication = Authentication;
    vm.climber = climber;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Climber
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.climber.$remove($state.go('climbers.list'));
      }
    }

    // Save Climber
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.climberForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.climber._id) {
        vm.climber.$update(successCallback, errorCallback);
      } else {
        vm.climber.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('climbers.view', {
          climberId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());
