'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Task = mongoose.model('Task'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current task
 */
exports.read = function (req, res) {
  res.json(req.model);
};

/**
 * Update a Task
 */
exports.update = function (req, res) {
  var task = req.model;

  task.title = req.body.title;
  task.completionDate = req.body.completionDate;
  task.skillLevel = req.body.skillLevel;
  // TODO

  task.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(task);
  });
};

/**
 * Delete a task
 */
exports.delete = function (req, res) {
  var task = req.model;

  task.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(task);
  });
};

/**
 * List of Tasks
 */
exports.list = function (req, res) {
  Task.find({}, '-createdBy -updated -updatedBy').sort('-created').populate('task', 'title').exec(function (err, tasks) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(tasks);
  });
};

/**
 * Task middleware
 */
exports.taskByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Task is invalid'
    });
  }

  Task.findById(id, '-createdBy -updated -updatedBy').exec(function (err, task) {
    if (err) {
      return next(err);
    } else if (!task) {
      return next(new Error('Failed to load task ' + id));
    }

    req.model = task;
    next();
  });
};
