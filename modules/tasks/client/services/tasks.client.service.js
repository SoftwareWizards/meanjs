// Tasks service used to communicate Tasks REST endpoints
(function () {
  'use strict';

  angular
    .module('tasks.services')
    .factory('Occupation', Occupation);

  Occupation.$inject = ['$window'];

  function Occupation($window) {
    var occup = {
      task: $window.task
    };

    return occup;
  }

  TasksService.$inject = ['$resource'];

  function TasksService($resource) {
    var Tasks = $resource('/api/tasks', {}, {
      update: {
        method: 'PUT'
      },
      deleteProvider: {
        method: 'DELETE',
        url: '/api/tasks/listing',
        params: {
          provider: '@provider'
        }
      },
      add: {
        method: 'POST',
        url: '/api/tasks/add'
      }
    });

    angular.extend(Tasks, {
      taskBuild: function (details) {
        return this.add(details).$promise;
      }
    });

    return Tasks;
  }


  angular
      .module('tasks.services')
      .factory('OccupationService', OccupationService);

  OccupationService.$inject = ['$resource'];

  function OccupationService($resource) {
    return $resource('/api/tasks/:taskId', {
      userId: '@_id'
    },
    {
      update: {
        method: 'PUT'
      }
    });
  }
}());
