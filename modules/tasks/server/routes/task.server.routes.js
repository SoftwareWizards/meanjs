'use strict';

module.exports = function (app) {
  // Task Routes
  var tasks = require('../controllers/tasks.server.controller');

  // Setting up the tasks profile api
  app.route('/api/tasks').post(tasks.create);
  app.route('/api/tasks').get(tasks.retrieve);
  app.route('/api/tasks').put(tasks.update);
  app.route('/api/tasks').delete(tasks.delete);

  // Finish by binding the task middleware
  app.param('taskId', tasks.taskByID);
};
