* Dependencies */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tasks = require('../models/tasks.server.model.js');
var config = require('../config/config');

/* Connect to your database */
mongoose.connect(config.db.uri);

/*
  In this file, you should use Mongoose queries in order to retrieve/add/remove/update listings.
  On an error you should send a 404 status code, as well as the error message.
  On success (aka no error), you should send the listing(s) as JSON in the response.
  HINT: if you are struggling with implementing these functions, refer back to this tutorial
  from assignment 3 https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
 */

/* Create a tasks */
exports.create = function(req, res) {
  //console.log("In create");
  /* Instantiate a tasks */
  var tasks = new tasks(req.body);

  /* Then save the tasks */
  tasks.save(function(err) {
    if(err) {
      //console.log(err);
      res.status(400).send(err);
    } else {
      res.json(tasks);
    }
  });
};

/* Show the current tasks */
exports.read = function(req, res) {
  /* send back the tasks as json from the request */
  //console.log("In read");
  res.json(req.tasks);
};

/* Update a listing */
exports.update = function(req, res) {
  var tasks = req.tasks;

  /* Replace the article's properties with the new properties found in req.body */
  tasks.title = req.body.title;
  tasks.completionDate = req.body.completionDate;
  tasks.taskType = req.body.taskType;
  tasks.instructions = req.body.instructions;
  tasks.updated_at = new Date();

  /* Save the article */
  listing.save(function(err) {
    if(err) {
      // console.log(err);
      res.status(400).send(err);
    } else {
      res.json(tasks);
    }
  });
};

/* Delete a listing */
exports.delete = function(req, res) {
  var tasks = req.tasks;

  /* Remove the article */
  tasks.remove(function(err) {
    if(err) {
      res.status(400).send(err);
    }
    else {
      res.end();
    }
  });
};

/* Retreive all the directory listings, sorted alphabetically by listing code */
exports.tasks = function(req, res) {

  tasks.find().sort('code').exec(function(err, tasks) {
    if(err) {

      res.status(400).send(err);
    } else {

      res.json(tasks);
    }
  });
};
