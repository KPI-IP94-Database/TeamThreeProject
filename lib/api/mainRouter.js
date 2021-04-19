'use strict';

const { getUserByEmail } =
  require('./controllers/userController.js');
const { removeApplicationById, getApplicationsByStudentId } =
  require('./controllers/applicationController.js');

exports.routesConfig = (app, db) => {
  
  app.get('/', (req, res) => {
    res.send('Hello, boi! Use one of these:' +
      '{ "route": "/user/getByEmail", "method": "GET" },' +
      '{ "route": "/application/remove", "method": "POST" },' +
      '{ "route": "/application/get", "method": "POST" }'
    );
  });

  app.get('/user/getByEmail/:email', (req, res) => {
    const email = req.params.email;
    getUserByEmail(email, res, db);
  });

  app.post('/application/remove', (req, res) => {
    removeApplicationById(req, res, db);
  });

  app.post('/application/get', (req, res) => {
    getApplicationsByStudentId(req, res, db);
  });
};
