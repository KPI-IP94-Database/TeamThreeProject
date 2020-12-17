'use strict';

// Import the needed package (it is exported from wrappers.js)
const sqlite3 = require('./wrappers.js').verbose();
const dbJson = require('../db/dbModel.json');

const initDB = path => {
  // Open the database connection
  // sqlite3.Database(pathToTheDatabase, callback)
  const db = new sqlite3.Database(path, err => {
    if (err) {
      console.error(err.message);
    }
  });

  // Execute queries one by one
  db.serialize(() => {
    for (const tableModel of dbJson) {
      db.createTable(tableModel);
    }
    // NOTE: first we create tables without foreign keys,
    // then we create tables with foreign keys, that refer
    // to the previous tables.
  });
  return db;
};

module.exports = { initDB };
