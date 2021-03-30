'use strict';

const userController = require('./controllers/userController.js');
const applicationController = require('./controllers/applicationController.js');

exports.routesConfig = app => {
  app.get('/user/getByEmail', [
    userController.getUserByEmail
  ]);

  app.post('/application/remove', [
    applicationController.removeApplicationById
  ]);

  app.post('/application/get', [
    applicationController.getApplicationsByStudentId
  ]);
};
