(function () {
  'use strict';

  angular
    .module('users.builder')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Tasks module
  function menuConfig(menuService) {
    menuService.addSubMenuItem('topbar', 'builder', {
      title: 'Manage Tasks',
      state: 'builder.tasks'
    });
  }
}());
