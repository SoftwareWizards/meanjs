'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

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
  type: {
    type: String,
    default: '',
    required: 'Please fill Task type',
    trim: true
  },
  level: {
    type: String,
    //default: '',
    //required: 'Please fill Task level',
    trim: true
  },
  priority: {
    type: String,
    //default: '',
    //required: 'Please fill Task priority',
    trim: true
  },
  compensation: {
    type: Number,
    min: 1,
    required: 'Compensation required',
    trim: true
  },
  paymentId: {
    type: String,
    required: 'Payment required.',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
  },

});

mongoose.model('Task', TaskSchema);
