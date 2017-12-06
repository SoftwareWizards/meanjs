(function () {
  'use strict';

  angular
    .module('tasks.routes')
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

          //added this line
          roles: ['user', 'admin','builder', 'climber'],
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
          roles: ['user', 'admin','builder']
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


          //added this line
          roles: ['user', 'admin', 'builder'],
          pageTitle: 'Edit Task {{ taskResolve.name }}'
        }
      })
      .state('tasks.view', {
        url: '/:taskId',
        templateUrl: 'modules/tasks/client/views/view-task.client.view.html',
        controller: 'TasksController',
        controllerAs: 'vm',
        resolve: {
          taskResolve: getTask
        },
        data: {

          roles: ['user', 'admin','builder'],
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
