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
  demographic: {
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
  },
  created: {
    type: Date,
    default: Date.now
  }
});

/* create a 'pre' function that adds the updated_at (and created_at if not already there) property */
taskSchema.pre('save', function(next) {
  var currentTime = new Date;
  this.updated_at = currentTime;
  if(!this.created_at)
  {
    this.created_at = currentTime;
  }
  next();
});

/* Use your schema to instantiate a Mongoose model */
var Task = mongoose.model('Task', taskSchema);

/* Export the model to make it available to other parts of your Node application */
module.exports = Task;
