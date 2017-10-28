// Builders service used to communicate Builders REST endpoints
(function () {
  'use strict';

  angular
    .module('builders')
    .factory('BuildersService', BuildersService);

  BuildersService.$inject = ['$resource'];

  function BuildersService($resource) {
    return $resource('api/builders/:builderId', {
      builderId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
