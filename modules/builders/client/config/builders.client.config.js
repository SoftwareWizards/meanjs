(function () {
  'use strict';

  angular
    .module('builders')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    /*
    menuService.addMenuItem('topbar', {
      title: 'Builders',
      state: 'builders',
      type: 'dropdown',
      // need to change roles so only admin can see this
      roles: ['admin']
    });
*/
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'builders', {
      title: 'List Builders',
      state: 'builders.list',
      roles: ['admin']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'builders', {
      title: 'Manage Builder',
      state: 'builders.create',
      roles: ['admin']
    });
  }
}());
