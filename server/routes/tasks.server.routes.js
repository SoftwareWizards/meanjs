/* Dependencies */
var tasks = require('../controllers/tasks.server.controller.js'),
    express = require('express'),
    router = express.Router();

/*
  The ':' specifies a URL parameter.
 */
router.route('/:taskId')
  .get(tasks.read)
  .delete(tasks.delete);

/*
  The 'router.param' method allows us to specify middleware we would like to use to handle
  requests with a parameter.

  Say we make an example request to '/tasks/566372f4d11de3498e2941c9'

  The request handler will first find the specific listing using this 'tasksById'
  middleware function by doing a lookup to ID '566372f4d11de3498e2941c9' in the Mongo database,
  and bind this listing to the request object.

  It will then pass control to the routing function specified above, where it will either
  get, update, or delete that specific listing (depending on the HTTP verb specified)
 */
router.param('taskId', tasks.taskByID);

module.exports = router;
