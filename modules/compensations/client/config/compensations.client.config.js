(function () {
  'use strict';

  angular
    .module('compensations')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Compensation',
      state: 'compensations',
      type: 'dropdown',
      roles: ['*']
    });

    // Originally list
    menuService.addSubMenuItem('topbar', 'compensations', {
      title: 'Receive Compensation',
      state: 'compensations.list',
      roles: ['user']
    });

    // Originally create
    menuService.addSubMenuItem('topbar', 'compensations', {
      title: 'Send Compensation',
      state: 'compensations.create',
      roles: ['user']
    });
  }
}());
