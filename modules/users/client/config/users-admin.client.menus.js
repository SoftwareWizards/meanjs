(function () {
  'use strict';

  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Climbers',
      state: 'admin.users'
    });
    // Configuring the Users module
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Builders',
      state: 'admin.users'
    });
    // Configuring the Users module
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Users',
      state: 'admin.users'
    });
  }
}());
