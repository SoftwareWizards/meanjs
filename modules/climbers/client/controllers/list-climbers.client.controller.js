(function () {
  'use strict';

  angular
    .module('climbers')
    .controller('ClimbersListController', ClimbersListController);

  ClimbersListController.$inject = ['ClimbersService'];

  function ClimbersListController(ClimbersService) {
    var vm = this;

    vm.climbers = ClimbersService.query();
  }
}());
