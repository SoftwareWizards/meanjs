(function () {
  'use strict';

  // Setting up route
  angular
    .module('tasks.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Users state routing
    $stateProvider
      .state('view', {
        abstract: true,
        url: '/settings',
        templateUrl: '/modules/tasks/client/views/tasks.client.view.html',
        controller: 'TaskController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      });

    // TODO
  }
}());
