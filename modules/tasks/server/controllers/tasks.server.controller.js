'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Task = mongoose.model('Task'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a Task
 */
exports.create = function(req, res) {

  var task = new Task(req.body);

  task.user = req.user;

  task.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(task);
    }
  });
};

/**
 * Show the current Task
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var task = req.task ? req.task.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  task.isCurrentUserOwner = req.user && task.user && task.user._id.toString() === req.user._id.toString();

  res.json(task);

};

/**
 * Update a Task
 */
exports.update = function(req, res) {
  var task = req.task;

  task.title = req.body.title;
  task.completionDate = req.body.completionDate;
  task.skillLevel = req.body.skillLevel;
  task.taskType = req.body.taskType;
  task.instructions = req.body.instructions;
  task.updated_at = new Date();

  task.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(task);
    }
  });
};

/**
 * Delete an Task
 */
exports.delete = function(req, res) {
  var task = req.task;

  task.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.end();
    }
  });
};

/**
 * List of Tasks
 */
exports.list = function(req, res) {
  Task.find({}, '-createdBy -updated -updatedBy').sort('-created').populate('task', 'title').exec(function (err, tasks) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(tasks);
    }
  });
};

/**
 * Task middleware
 */
exports.taskByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Task is invalid'
    });
  }

  Task.findById(id, '-createdBy -updated -updatedBy').exec(function (err, task) {
    if (err) {
      return next(err);
    } else if (!task) {
      return res.status(404).send({
        message: 'Task with identifier ' + id + ' cannot be found.'
      });
    }
    req.task = task;
    next();
  });
};
