'use strict';

/**
 * Module dependencies
 */
var compensationsPolicy = require('../policies/compensations.server.policy'),
  compensations = require('../controllers/compensations.server.controller');

module.exports = function (app) {
  // Compensations Routes
  app.route('/api/compensations').all(compensationsPolicy.isAllowed)
    .get(compensations.list)
    .post(compensations.create);

  app.route('/api/compensations/:compensationId').all(compensationsPolicy.isAllowed)
    .get(compensations.read)
    .put(compensations.update)
    .delete(compensations.delete);

  // Finish by binding the Compensation middleware
  app.param('compensationId', compensations.compensationByID);
};
