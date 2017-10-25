'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  config = require(path.resolve('./config/config')),
  Schema = mongoose.Schema,
  validator = require('validator');

/**
 * Task Schema
 */
var TaskSchema = new Schema({
  title: {
    type: String,
    trim: true,
    default: ''
  },
  completionDate: {
    type: Date,
    trim: true,
    default: Date.now
  },
  type: {
    type: String,
    trim: true,
    default: ''
  },
  skillLevel: {
    type: String,
    lowercase: true,
    trim: true,
    default: ''
  },
  demographic: {
    type: String,
    lowercase: true,
    trim: true
  },
  instructions: {
    type: String,
    default: ''
  },
  attachments: {
    type: String
  },
  id: {
    type: String,
    required: 'Provider is required'
  },
  createdBy: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user'],
    required: 'Please provide at least one role'
  },
  updatedBy: {
    type: [{
      type: String,
      enum: ['user', 'admin']
    }],
    default: ['user'],
    required: 'Please provide at least one role'
  },
  updated: {
    type: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});

/**
 * Hook a pre save method to hash the password
 */
TaskSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

TaskSchema.statics.seed = seed;

mongoose.model('Tasks', TaskSchema);

/**
* Seeds the Task collection with document (Task)
* and provided options.
*/
function seed(doc, options) {
  var Task = mongoose.model('Task');

  // TODO
}
