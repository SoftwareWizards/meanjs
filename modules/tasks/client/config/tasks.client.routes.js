(function () {
  'use strict';

  // Setting up route
  angular
    .module('tasks.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('builder.task-add', {
        url: '/tasks/add',
        templateUrl: 'modules/tasks/client/views/add-task.client.view.html',
        controller: 'TaskController',
        controllerAs: 'vm',
        data: {
          roles: ['builder', 'admin'],
          pageTitle: 'Build Tasks'
        }
      })
      .state('builder.tasks', {
        url: '/tasks',
        templateUrl: 'modules/tasks/client/views/list-tasks.client.view.html',
        controller: 'TaskListController',
        controllerAs: 'vm'
      })
      .state('builder.task', {
        url: '/tasks/:taskId',
        templateUrl: '/modules/tasks/client/views/view-task.client.view.html',
        controller: 'TaskController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getTask
        },
        data: {
          roles: ['builder', 'admin'],
          pageTitle: '{{ taskResolve.displayName }}'
        }
      })
      .state('builder.task-edit', {
        url: '/tasks/:taskId/edit',
        templateUrl: 'modules/tasks/client/views/edit-task.client.view.html',
        controller: 'TaskController',
        controllerAs: 'vm',
        resolve: {
          taskResolve: getTask
        },
        data: {
          roles: ['builder', 'admin'],
          pageTitle: '{{ taskResolve.displayName }}'
        }
      });
  }

  getTask.$inject = ['$stateParams', 'TaskService'];

  function getTask($stateParams, TasksService) {
    return TasksService.get({
      taskId: $stateParams.taskId
    }).$promise;
  }
}());
