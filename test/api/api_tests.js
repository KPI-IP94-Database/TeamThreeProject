'use strict';

const assert = require('assert').strict;
const { User, Application } = require('../../lib/dbObjects');

getUserTest();
getApplicationsTest();
editApplicationTest();
removeApplicationTest();

function getUserTest() {
  const email = '1234@test.test';
  assert.strictEqual(getUser(email), new User());
}

function getApplicationsTest() {
  const userId = 10;
  assert.strictEqual(
    getApplications(userId),
    [new Application(), new Application()]
  );
}

function editApplicationTest() {
  const aplc = new Application();
  assert.strictEqual(editApplication(aplc), true);
}

function removeApplicationTest() {
  const aplcId = 20;
  assert.strictEqual(removeApplication(aplcId), true);
}