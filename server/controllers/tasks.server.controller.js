
/* Dependencies */
var mongoose = require('mongoose'),
    Task = require('../models/tasks.server.model.js');

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update tasks.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the task(s) as JSON in the response.

  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a task */
exports.create = function(req, res) {

  /* Instantiate a Task */
  var task = new Task(req.body);

  /* save the coordinates (located in req.results if there is an address property) */
  if(req.results) {
    task.coordinates = {
      latitude: req.results.lat,
      longitude: req.results.lng
    };
  }

  /* Then save the task */
  task.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(task);
    }
  });
};

/* Show the current task */
exports.read = function(req, res) {
  /* send back the task as json from the request */
  res.json(req.task);
};

/* Update a task */
exports.update = function(req, res) {
  var task = req.task;

  /* Replace the article's properties with the new properties found in req.body */
  task.name = req.body.name;
  task.code = req.body.code;
  task.address = req.body.address;

  /* save the coordinates (located in req.results if there is an address property) */
  if(req.results) {
    task.coordinates = {
      latitude: req.results.lat,
      longitude: req.results.lng
    };
  }

  /* Save the article */
  task.save(function(err) {
    if(err) {
      console.log(err);
      res.status(400).send(err);
    } else {
      res.json(task);
    }
  });
};

/* Delete a task */
exports.delete = function(req, res) {
  var task = req.task;

  /* Remove the article */
  task.remove(function(err) {
    if(err) {
      res.status(400).send(err);
    }
    else {
      res.end();
    }
  })
};

/* Retreive all the directory tasks, sorted alphabetically by task code */
exports.list = function(req, res) {
  Task.find().sort('code').exec(function(err, tasks) {
    if(err) {
      res.status(400).send(err);
    } else {
      res.json(tasks);
    }
  });
};

/*
  Middleware: find a task by its ID, then pass it to the next request handler.

  HINT: Find the task using a mongoose query,
        bind it to the request object as the property 'task',
        then finally call next
 */
exports.taskByID = function(req, res, next, id) {
  Task.findById(id).exec(function(err, task) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.task = task;
      next();
    }
  });
};
