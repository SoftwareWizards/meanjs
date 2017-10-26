'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Climber Schema
 */
var ClimberSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Climber name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Climber', ClimberSchema);
