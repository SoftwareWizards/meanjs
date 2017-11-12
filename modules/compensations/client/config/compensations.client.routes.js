(function () {
  'use strict';

  angular
    .module('compensations')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('compensations', {
        abstract: true,
        url: '/compensations',
        template: '<ui-view/>'
      })
      .state('compensations.list', {
        url: '',
        templateUrl: 'modules/compensations/client/views/list-compensations.client.view.html',
        controller: 'CompensationsListController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin', 'builder','climber'],
          pageTitle: 'Compensations List'
        }
      })
      .state('compensations.create', {
        url: '/create',
        templateUrl: 'modules/compensations/client/views/form-compensation.client.view.html',
        controller: 'CompensationsController',
        controllerAs: 'vm',
        resolve: {
          compensationResolve: newCompensation
        },
        data: {
          roles: ['user', 'admin','builder'],
          pageTitle: 'Compensations Create'
        }
      })
      .state('compensations.edit', {
        url: '/:compensationId/edit',
        templateUrl: 'modules/compensations/client/views/form-compensation.client.view.html',
        controller: 'CompensationsController',
        controllerAs: 'vm',
        resolve: {
          compensationResolve: getCompensation
        },
        data: {
          roles: ['user', 'admin', 'builder'],
          pageTitle: 'Edit Compensation {{ compensationResolve.name }}'
        }
      })
      .state('compensations.view', {
        url: '/:compensationId',
        templateUrl: 'modules/compensations/client/views/view-compensation.client.view.html',
        controller: 'CompensationsController',
        controllerAs: 'vm',
        resolve: {
          compensationResolve: getCompensation
        },
        data: {
          pageTitle: 'Compensation {{ compensationResolve.name }}'
        }
      });
  }

  getCompensation.$inject = ['$stateParams', 'CompensationsService'];

  function getCompensation($stateParams, CompensationsService) {
    return CompensationsService.get({
      compensationId: $stateParams.compensationId
    }).$promise;
  }

  newCompensation.$inject = ['CompensationsService'];

  function newCompensation(CompensationsService) {
    return new CompensationsService();
  }
}());
