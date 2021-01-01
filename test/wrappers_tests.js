'use strict';

const assert = require('assert').strict;
const sqlite3 = require('../lib/wrappers.js');

const db = new sqlite3.Database(':memory:', err => {
  if (err) throw err;
});

const
  tce1 = 'Attempt to create table without a name',
  tce2 = 'Attempt to create table without fields',
  tce3 = 'Attempt to create table with a nameless field',
  tce4 = 'Attempt to create table with a typeless field Bar',
  tce5 = 'Attempt to create table with a field Bar, which has ' +
         'primary and foreign key simultaneously',
  tce6 = 'Attempt to create table with no references in foreign key, ' +
         'field Bar';

const errorAssertion = (errExpected, assertionTitle, ...asserted) => {
  try {
    const callback = asserted.shift();
    callback(...asserted);
  } catch (e) {
    assert.strictEqual(e.message, errExpected, assertionTitle + ' failed');
    console.dir({ assertionTitle, msg: e.message, table: e.tableName });
  }
};

errorAssertion(tce1, 'tce1', db.createTable);
errorAssertion(tce2, 'tce2', db.createTable, {
  name: 'Foo'
});

errorAssertion(tce3, 'tce3', db.createTable, {
  name: 'Foo',
  fields: [
    { }
  ]
});

errorAssertion(tce4, 'tce4', db.createTable, {
  name: 'Foo',
  fields: [
    {
      name: 'Bar'
    }
  ]
});

errorAssertion(tce5, 'tce5', db.createTable, {
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

errorAssertion(tce6, 'tce6', db.createTable, {
  name: 'Foo',
  fields: [
    {
      name: 'Bar',
      type: 'INTEGER',
      fkey: { }
    }
  ]
});