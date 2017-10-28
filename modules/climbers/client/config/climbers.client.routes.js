(function () {
  'use strict';

  angular
    .module('climbers')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('climbers', {
        abstract: true,
        url: '/climbers',
        template: '<ui-view/>'
      })
      .state('climbers.list', {
        url: '',
        templateUrl: 'modules/climbers/client/views/list-climbers.client.view.html',
        controller: 'ClimbersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Climbers List'
        }
      })
      .state('climbers.create', {
        url: '/create',
        templateUrl: 'modules/climbers/client/views/form-climber.client.view.html',
        controller: 'ClimbersController',
        controllerAs: 'vm',
        resolve: {
          climberResolve: newClimber
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Climbers Create'
        }
      })
      .state('climbers.edit', {
        url: '/:climberId/edit',
        templateUrl: 'modules/climbers/client/views/form-climber.client.view.html',
        controller: 'ClimbersController',
        controllerAs: 'vm',
        resolve: {
          climberResolve: getClimber
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Climber {{ climberResolve.name }}'
        }
      })
      .state('climbers.view', {
        url: '/:climberId',
        templateUrl: 'modules/climbers/client/views/view-climber.client.view.html',
        controller: 'ClimbersController',
        controllerAs: 'vm',
        resolve: {
          climberResolve: getClimber
        },
        data: {
          pageTitle: 'Climber {{ climberResolve.name }}'
        }
      });
  }

  getClimber.$inject = ['$stateParams', 'ClimbersService'];

  function getClimber($stateParams, ClimbersService) {
    return ClimbersService.get({
      climberId: $stateParams.climberId
    }).$promise;
  }

  newClimber.$inject = ['ClimbersService'];

  function newClimber(ClimbersService) {
    return new ClimbersService();
  }
}());
