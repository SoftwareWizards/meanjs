'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  path = require('path'),
  config = require(path.resolve('./config/config')),
  Schema = mongoose.Schema,
  chalk = require('chalk');

/**
 * Task Schema
 */
var TaskSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Task name',
    trim: true
  },
<<<<<<< HEAD

  //additions begin
  type: {
    type: String,
    default: '',
    required: 'Please fill Task type',
    trim: true
  },
  level: {
    type: String,
    default: '',
    required: 'Please fill Task level',
    trim: true
  },
  priority: {
    type: String,
    default: '',
    required: 'Please fill Task priority',
    trim: true
  },


  //additions end

  created: {
    type: Date,
    default: Date.now
=======
  type: {
    type: String,
    default: '',
    trim: true
  },
  skillLevel: {
    type: String,
    default: '',
    trim: true
>>>>>>> cc5a8e4c644836300ff8a6322f14ccb10d3bccfd
  },
  priority: {
    type: String,
    default: '',
    trim: true
  },
  assignedTo: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  createdBy: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});

TaskSchema.statics.seed = seed;

mongoose.model('Task', TaskSchema);

/**
 * Seeds the User collection with document (User)
 * and provided options.
 */
function seed(doc, options) {
  var Task = mongoose.model('Task');

  return new Promise(function (resolve, reject) {

    skipDocument()
      .then(add)
      .then(function (response) {
        return resolve(response);
      })
      .catch(function (err) {
        return reject(err);
      });

    function skipDocument() {
      return new Promise(function (resolve, reject) {
        Task
          .findOne({
            _id: doc._id
          })
          .exec(function (err, existing) {
            if (err) {
              return reject(err);
            }

            if (!existing) {
              return resolve(false);
            }

            if (existing && !options.overwrite) {
              return resolve(true);
            }

            // Remove Task (overwrite)

            existing.remove(function (err) {
              if (err) {
                return reject(err);
              }

              return resolve(false);
            });
          });
      });
    }

    function add(skip) {
      return new Promise(function (resolve, reject) {

        if (skip) {
          return resolve({
            message: chalk.yellow('Database Seeding: Task\t\t' + doc.name + ' skipped')
          });
        }
      });
    }

  });
}
