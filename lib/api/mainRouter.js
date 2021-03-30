'use strict';

const { getUserByEmail } =
  require('./controllers/userController.js');
const { removeApplicationById, getApplicationsByStudentId } =
  require('./controllers/applicationController.js');

exports.routesConfig = (app, db) => {
  app.get('/user/getByEmail', (req, res) => {
    getUserByEmail(req, res, db);
  });

  app.post('/application/remove', (req, res) => {
    removeApplicationById(req, res, db);
  });

  app.post('/application/get', (req, res) => {
    getApplicationsByStudentId(req, res, db);
  });
};
