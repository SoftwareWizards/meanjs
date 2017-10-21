angular.module('tasks').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider) {
    //tasks state providing
    $stateProvider
      .state('tasks', {
        url: '/tasks',
        abstract: true,
        template: '<ui-view/>'
      })
      .state('tasks.list', {
        url: '',
        templateUrl: 'app/views/list-tasks.client.view.html',
        params: {
          successMessage: null
        }
      })
      .state('tasks.create', {
        url: '/create',
        templateUrl: 'app/views/create-task.client.view.html'
      })
      .state('tasks.view', {
        url: '/:taskId',
        templateUrl: 'app/views/view-task.client.view.html'
      })
      /*
        Create a state for editing an individual task.
       */
	  .state('tasks.edit', {
		url: '/edit/:taskId',
		templateUrl: 'app/views/edit-task.client.view.html'
	  })
  }
]);