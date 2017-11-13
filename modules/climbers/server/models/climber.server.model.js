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
  email: {
    type: String,
    default: '',
    required: 'Please fill in your email',
    trim: true
  },
  age:{
    type:integer,
    default: '',
    required: 'Please fill in your age',
    trim: true,
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
