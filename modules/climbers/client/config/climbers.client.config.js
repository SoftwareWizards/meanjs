(function () {
  'use strict';

  angular
    .module('climbers')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Climbers',
      state: 'climbers',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'climbers', {
      title: 'List Climbers',
      state: 'climbers.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'climbers', {
      title: 'Create Climber',
      state: 'climbers.create',
      roles: ['user']
    });
  }
}());
