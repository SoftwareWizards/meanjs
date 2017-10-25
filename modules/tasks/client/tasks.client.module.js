(function (app) {
  'use strict';

  app.registerModule('tasks');
  app.registerModule('tasks.routes', ['ui.router', 'core.routes']);
}(ApplicationConfiguration));
