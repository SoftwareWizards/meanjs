'use strict';

/**
 * Module dependencies
 */
var buildersPolicy = require('../policies/builders.server.policy'),
  builders = require('../controllers/builders.server.controller');

module.exports = function(app) {
  // Builders Routes
  app.route('/api/builders').all(buildersPolicy.isAllowed)
    .get(builders.list)
    .post(builders.create);

  app.route('/api/builders/:builderId').all(buildersPolicy.isAllowed)
    .get(builders.read)
    .put(builders.update)
    .delete(builders.delete);

  // Finish by binding the Builder middleware
  app.param('builderId', builders.builderByID);
};
