'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Compensation = mongoose.model('Compensation'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Compensation
 */
exports.create = function(req, res) {
  var compensation = new Compensation(req.body);
  compensation.user = req.user;

  compensation.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(compensation);
    }
  });
};

/**
 * Show the current Compensation
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var compensation = req.compensation ? req.compensation.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  compensation.isCurrentUserOwner = req.user && compensation.user && compensation.user._id.toString() === req.user._id.toString();

  res.jsonp(compensation);
};

/**
 * Update a Compensation
 */
exports.update = function(req, res) {
  var compensation = req.compensation;

  compensation = _.extend(compensation, req.body);

  compensation.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(compensation);
    }
  });
};

/**
 * Delete an Compensation
 */
exports.delete = function(req, res) {
  var compensation = req.compensation;

  compensation.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(compensation);
    }
  });
};

/**
 * List of Compensations
 */
exports.list = function(req, res) {
  Compensation.find().sort('-created').populate('user', 'displayName').exec(function(err, compensations) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(compensations);
    }
  });
};

/**
 * Compensation middleware
 */
exports.compensationByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Compensation is invalid'
    });
  }

  Compensation.findById(id).populate('user', 'displayName').exec(function (err, compensation) {
    if (err) {
      return next(err);
    } else if (!compensation) {
      return res.status(404).send({
        message: 'No Compensation with that identifier has been found'
      });
    }
    req.compensation = compensation;
    next();
  });
};
