/* register the modules the application depends upon here*/
angular.module('tasks', []);

/* register the application and inject all the necessary dependencies */
var app = angular.module('directoryApp', ['ui.router', 'ui.bootstrap', 'tasks']);

/* application configuration */
app.config(['$urlRouterProvider', '$locationProvider',
  function($urlRouterProvider, $locationProvider) {
    /* https://docs.angularjs.org/api/ng/provider/$locationProvider */
    $locationProvider.html5Mode(true);

    /* go to the '/tasks' URL if an invalid route is provided */
    $urlRouterProvider.otherwise('/tasks');
  }
]);

/* set the initial state of the application */
app.run(['$state',
  function($state) {
    $state.go('tasks.list');
  }
]);
