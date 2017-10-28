// Climbers service used to communicate Climbers REST endpoints
(function () {
  'use strict';

  angular
    .module('climbers')
    .factory('ClimbersService', ClimbersService);

  ClimbersService.$inject = ['$resource'];

  function ClimbersService($resource) {
    return $resource('api/climbers/:climberId', {
      climberId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
