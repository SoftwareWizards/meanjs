(function () {
  'use strict';

  angular
    .module('tasks')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Tasks',
      state: 'tasks',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'tasks', {
      title: 'List Tasks',
      state: 'tasks.list',
      roles: ['*']
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'tasks', {
      title: 'Create Task',
      state: 'tasks.create',
      roles: ['admin', 'builder']
    });

    // lists builder's tasks and climber's accepted tasks
    menuService.addSubMenuItem('topbar', 'tasks', {
      title: 'My Tasks',
      state: 'tasks.mytasks',
      roles: ['climber', 'builder']
    });
  }
}());
