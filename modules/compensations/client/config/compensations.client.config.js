(function () {
  'use strict';

  angular
    .module('compensations')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Compensations',
      state: 'compensations',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'compensations', {
      title: 'List Compensations',
      state: 'compensations.list',
      roles: ['*']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'compensations', {
      title: 'Create Compensation',
      state: 'compensations.create',
      roles: ['admin', 'builder']
    });
  }
}());
