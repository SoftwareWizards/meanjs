(function () {
  'use strict';

  angular
    .module('tasks')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('tasks', {
        abstract: true,
        url: '/tasks',
        template: '<ui-view/>'
      })
      .state('tasks.list', {
        url: '',
        templateUrl: 'modules/tasks/client/views/list-tasks.client.view.html',
        controller: 'TasksListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Tasks List'
        }
      })
      .state('tasks.create', {
        url: '/create',
        templateUrl: 'modules/tasks/client/views/form-task.client.view.html',
        controller: 'TasksController',
        controllerAs: 'vm',
        resolve: {
          taskResolve: newTask
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Tasks Create'
        }
      })
      .state('tasks.edit', {
        url: '/:taskId/edit',
        templateUrl: 'modules/tasks/client/views/form-task.client.view.html',
        controller: 'TasksController',
        controllerAs: 'vm',
        resolve: {
          taskResolve: getTask
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Task {{ taskResolve.name }}'
        }
      })
      /*send climber compensation route
      .state('tasks.send', {
        url: '/:taskId/send',
        templateUrl: 'modules/tasks/client/views/form-task.client.view.html',
        controller: 'TasksController',
        controllerAs: 'vm',
        resolve: {
          taskResolve: getTask
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Send Climber Compensation {{ taskResolve.name }}'
        }
      })

      end*/

      .state('tasks.view', {
        url: '/:taskId',
        templateUrl: 'modules/tasks/client/views/view-task.client.view.html',
        controller: 'TasksController',
        controllerAs: 'vm',
        resolve: {
          taskResolve: getTask
        },
        data: {
          pageTitle: 'Task {{ taskResolve.name }}'
        }
      });
  }

  getTask.$inject = ['$stateParams', 'TasksService'];

  function getTask($stateParams, TasksService) {
    return TasksService.get({
      taskId: $stateParams.taskId
    }).$promise;
  }

  newTask.$inject = ['TasksService'];

  function newTask(TasksService) {
    return new TasksService();
  }
}());
