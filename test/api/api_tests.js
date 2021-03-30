'use strict';

const { User, Application } = require('../../lib/dbObjects');
const { equals } = require('../utils');
const userController = require('../../lib/api/controllers/userController');
const applicationController = require('../../lib/api/controllers/applicationController');

// Prepared functions

// TODO: (1) status is returned as a complex JSON

const getUserTest = email => {
  // TODO: (2) prepare test DB and asserted data
  equals(userController.getUserByEmail(email), new User());
};

const getApplicationsTest = (userId, assertedApplications) => {
  equals(
    applicationController.getApplicationsByStudentId(userId),
    assertedApplications
  );
};

const editApplicationTest = () => {
  const aplc = new Application();
  // TODO: (2)
  equals(applicationController.editApplication(aplc), true);
};

const removeApplicationTest = aplcId => {
  equals(applicationController.removeApplicationById(aplcId), true);
};

// Test part

// getUser
const email = '1234@test.test';
getUserTest(email);

// getApplications
const userId = 10;
const appList = [new Application(), new Application()];
getApplicationsTest(userId, appList);

// editApplication
editApplicationTest();

// removeApplication
const aplcId = 20;
removeApplicationTest(aplcId);
