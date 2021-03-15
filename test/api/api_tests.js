'use strict';

const assert = require('assert').strict;
const { User, Application } = require('../../lib/dbObjects');

// Prepared functions

// TODO: (1) status is returned as a complex JSON

const getUserTest = email => {
  // TODO: (2) prepare test DB and asserted data
  assert.strictEqual(getUser(email), new User());
}

const getApplicationsTest = userId, assertedApplications => {
  assert.strictEqual(
    getApplications(userId),
    assertedApplications
  );
}

const editApplicationTest = () => {
  const aplc = new Application();
  // TODO: (2)
  assert.strictEqual(editApplication(aplc), true);
}

const removeApplicationTest = aplcId => {
  assert.strictEqual(removeApplication(aplcId), true);
}

// Test part

// getUser
const email = '1234@test.test';
getUserTest(email);

// getApplications
const userId = 10;
const appList = [new Application(), new Application()]
getApplicationsTest(userId, appList);

// editApplication
editApplicationTest();

// removeApplication
const aplcId = 20;
removeApplicationTest(aplcId);
