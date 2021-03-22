'use strict';

const { User, Application } = require('../../lib/dbObjects');
const { equals } = require('../utils');

// Prepared functions

// TODO: (1) status is returned as a complex JSON

const getUserTest = email => {
  // TODO: (2) prepare test DB and asserted data
  equals(getUser(email), new User());
};

const getApplicationsTest = (userId, assertedApplications) => {
  equals(
    getApplications(userId),
    assertedApplications
  );
};

const editApplicationTest = () => {
  const aplc = new Application();
  // TODO: (2)
  equals(editApplication(aplc), true);
};

const removeApplicationTest = aplcId => {
  equals(removeApplication(aplcId), true);
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
