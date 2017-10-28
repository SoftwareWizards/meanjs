'use strict';

/**
 * Module dependencies
 */
var climbersPolicy = require('../policies/climbers.server.policy'),
  climbers = require('../controllers/climbers.server.controller');

module.exports = function(app) {
  // Climbers Routes
  app.route('/api/climbers').all(climbersPolicy.isAllowed)
    .get(climbers.list)
    .post(climbers.create);

  app.route('/api/climbers/:climberId').all(climbersPolicy.isAllowed)
    .get(climbers.read)
    .put(climbers.update)
    .delete(climbers.delete);

  // Finish by binding the Climber middleware
  app.param('climberId', climbers.climberByID);
};
