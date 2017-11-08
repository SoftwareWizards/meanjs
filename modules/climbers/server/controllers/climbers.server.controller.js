'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Climber = mongoose.model('Climber'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Climber
 */
exports.create = function (req, res) {
  var climber = new Climber(req.body);
  climber.user = req.user;

  climber.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(climber);
    }
  });
};

/**
 * Show the current Climber
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var climber = req.climber ? req.climber.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  climber.isCurrentUserOwner = req.user && climber.user && climber.user._id.toString() === req.user._id.toString();

  res.jsonp(climber);
};

/**
 * Update a Climber
 */
exports.update = function (req, res) {
  var climber = req.climber;

  climber = _.extend(climber, req.body);

  climber.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(climber);
    }
  });
};

/**
 * Delete an Climber
 */
exports.delete = function (req, res) {
  var climber = req.climber;

  climber.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(climber);
    }
  });
};

/**
 * List of Climbers
 */
exports.list = function (req, res) {
  Climber.find().sort('-created').populate('user', 'displayName').exec(function (err, climbers) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(climbers);
    }
  });
};

/**
 * Climber middleware
 */
exports.climberByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Climber is invalid'
    });
  }

  Climber.findById(id).populate('user', 'displayName').exec(function (err, climber) {
    if (err) {
      return next(err);
    } else if (!climber) {
      return res.status(404).send({
        message: 'No Climber with that identifier has been found'
      });
    }
    req.climber = climber;
    next();
  });
};
