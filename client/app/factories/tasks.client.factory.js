angular.module('tasks').factory('Tasks', ['$http',
  function($http) {
    var methods = {
      getAll: function() {
        return $http.get('localhost:3000/api/tasks');
      },

      create: function(task) {
        return $http.post('localhost:3000/api/tasks', task);
      },

      read: function(id) {
        return $http.get('localhost:3000/api/tasks/' + id);
      },

      update: function(id, task) {
        return $http.put('localhost:3000/api/tasks/' + id, task);
      },

      delete: function(id) {
        return $http.delete('localhost:3000/api/tasks/' + id);
      }
    };
/**
    getAll: function() {
      return $http.get('https://safe-everglades-96060.herokuapp.com/api/tasks');
    },

    create: function(task) {
      return $http.post('https://safe-everglades-96060.herokuapp.com/api/tasks', task);
    },

    read: function(id) {
      return $http.get('https://safe-everglades-96060.herokuapp.com/api/tasks/' + id);
    },

    update: function(id, task) {
      return $http.put('https://safe-everglades-96060.herokuapp.com/api/tasks/' + id, task);
    },

    delete: function(id) {
      return $http.delete('https://safe-everglades-96060.herokuapp.com/api/tasks/' + id);
    }
  };
 **/
    return methods;
  }
]);
