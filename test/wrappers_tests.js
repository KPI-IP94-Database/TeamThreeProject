'use strict';

const assert = require('assert').strict;
const sqlite3 = require('../lib/wrappers.js');

const db = new sqlite3.Database(':memory:', err => {
  if (err) throw err;
});

const
  cte1 = 'Attempt to create table without a name',
  cte2 = 'Attempt to create table without fields, table Foo',
  cte3 = 'Attempt to create table with a nameless field, table Foo',
  cte4 = 'Attempt to create table with a typeless field Bar, table Foo',
  cte5 = 'Attempt to create table with a primary and foreign key' +
    'field Bar, table Foo';

const errorAssertion = (errExpected, errMessage, ...asserted) => {
  try {
    const callback = asserted.shift();
    callback(...asserted);
  } catch (e) {
    assert.strictEqual(e.message, errExpected, errMessage);
  }
};

errorAssertion(cte1, 'cte1 failed', db.createTable);
errorAssertion(cte2, 'cte2 failed', db.createTable, {
  name: 'Foo'
});

errorAssertion(cte3, 'cte3 failed', db.createTable, {
  name: 'Foo',
  fields: [
    { }
  ]
});

errorAssertion(cte4, 'cte4 failed', db.createTable, {
  name: 'Foo',
  fields: [
    {
      name: 'Bar'
    }
  ]
});

errorAssertion(cte5, 'cte5 failed', db.createTable, {
  name: 'Foo',
  fields: [
    {
      name: 'Bar',
      type: 'INTEGER',
      primary: true,
      fkey: { }
    }
  ]
});
