/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Task Schema
 */
var taskSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: 'Title is required',
  },
  completionDate: {
    type: Date,
    trim: true,
    default: Date.now,
  },
  taskType: {
    type: String,
    trim: true,
    default: '',
  },
  skillLevel: {
    type: String,
    trim: true,
    default: '',
  },
  taskType: {
    type: String,
    trim: true
  },
  instructions: {
    type: String,
    default: ''
  },
  attachments: {
    type: String
  },
  createdBy: {
    type: String
  },
  updatedBy: {
    type: String
  },
  updated: {
    type: Date
    default: Date
  },
  created: {
    type: Date,
    default: Date.now
  }
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
listingSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var task = mongoose.model('task', listingSchema);

/* Export the model to make it avaiable to other parts of your Node application */
module.exports = task;
