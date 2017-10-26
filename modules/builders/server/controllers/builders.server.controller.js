'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Builder = mongoose.model('Builder'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Builder
 */
exports.create = function(req, res) {
  var builder = new Builder(req.body);
  builder.user = req.user;

  builder.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(builder);
    }
  });
};

/**
 * Show the current Builder
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var builder = req.builder ? req.builder.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  builder.isCurrentUserOwner = req.user && builder.user && builder.user._id.toString() === req.user._id.toString();

  res.jsonp(builder);
};

/**
 * Update a Builder
 */
exports.update = function(req, res) {
  var builder = req.builder;

  builder = _.extend(builder, req.body);

  builder.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(builder);
    }
  });
};

/**
 * Delete an Builder
 */
exports.delete = function(req, res) {
  var builder = req.builder;

  builder.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(builder);
    }
  });
};

/**
 * List of Builders
 */
exports.list = function(req, res) {
  Builder.find().sort('-created').populate('user', 'displayName').exec(function(err, builders) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(builders);
    }
  });
};

/**
 * Builder middleware
 */
exports.builderByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Builder is invalid'
    });
  }

  Builder.findById(id).populate('user', 'displayName').exec(function (err, builder) {
    if (err) {
      return next(err);
    } else if (!builder) {
      return res.status(404).send({
        message: 'No Builder with that identifier has been found'
      });
    }
    req.builder = builder;
    next();
  });
};
