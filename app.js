'use strict';

const EasyWorkerThread = require('easy-worker-thread');

module.exports = app => {
  app.workerThread = new EasyWorkerThread(app.config.workerThread);
};
