'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Compensation Schema
 */
var CompensationSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Compensation name',
    trim: true
  },
  climber: {
    type: String,
    default: '',
    required: 'Please fill Climber name',
    trim: true
  },
  type: {
    type: String,
    default: '',
    required: 'Please fill Type name',
    trim: true
  },
  timeframe: {
    type: String,
    default: '',
    required: 'Please fill Timeframe name',
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

mongoose.model('Compensation', CompensationSchema);
