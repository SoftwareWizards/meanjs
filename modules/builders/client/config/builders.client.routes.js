(function () {
  'use strict';

  angular
    .module('builders')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('builders', {
        abstract: true,
        url: '/builders',
        template: '<ui-view/>'
      })
      .state('builders.list', {
        url: '',
        templateUrl: 'modules/builders/client/views/list-builders.client.view.html',
        controller: 'BuildersListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Builders List'
        }
      })
      .state('builders.create', {
        url: '/create',
        templateUrl: 'modules/builders/client/views/form-builder.client.view.html',
        controller: 'BuildersController',
        controllerAs: 'vm',
        resolve: {
          builderResolve: newBuilder
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Builders Create'
        }
      })
      .state('builders.edit', {
        url: '/:builderId/edit',
        templateUrl: 'modules/builders/client/views/form-builder.client.view.html',
        controller: 'BuildersController',
        controllerAs: 'vm',
        resolve: {
          builderResolve: getBuilder
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Builder {{ builderResolve.name }}'
        }
      })
      .state('builders.view', {
        url: '/:builderId',
        templateUrl: 'modules/builders/client/views/view-builder.client.view.html',
        controller: 'BuildersController',
        controllerAs: 'vm',
        resolve: {
          builderResolve: getBuilder
        },
        data: {
          pageTitle: 'Builder {{ builderResolve.name }}'
        }
      });
  }

  getBuilder.$inject = ['$stateParams', 'BuildersService'];

  function getBuilder($stateParams, BuildersService) {
    return BuildersService.get({
      builderId: $stateParams.builderId
    }).$promise;
  }

  newBuilder.$inject = ['BuildersService'];

  function newBuilder(BuildersService) {
    return new BuildersService();
  }
}());
