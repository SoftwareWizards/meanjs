(function () {
  'use strict';

  angular
    .module('builders')
    .controller('BuildersListController', BuildersListController);

  BuildersListController.$inject = ['BuildersService'];

  function BuildersListController(BuildersService) {
    var vm = this;

    vm.builders = BuildersService.query();
  }
}());
