'use strict';

// Import the needed package
const sqlite3 = require('sqlite3').verbose();

// Open the database connection (in this case inside the RAM)
// sqlite3.Database(pathToTheDatabase, callback)
const db = new sqlite3.Database(':memory:', err => {
  if (err) {
    console.error(err.message);
  }
});

// Execute queries one by one
db.serialize(() => {
  // db.run(sqlQuery) is used in the case
  // when we don't need the output data

  // Queries can be chained, for example,
  // db.run(sqlQuery1).run(sqlQuery2)
  db.run(`CREATE TABLE user(
    id INTEGER PRIMARY KEY,
    email VARCHAR(70),
    password VARCHAR(255),
    grade_1 DOUBLE,
    grade_2 DOUBLE,
    grade_3 DOUBLE,
    certificate DOUBLE
  )`).run(`CREATE TABLE application(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    speciality_id INTEGER,
    priority INTEGER,
    FOREIGN KEY (user_id)
      REFERENCES user (id)
  )`);
  // TODO: make CREATE TABLE queries for other tables
  // NOTE: first we create tables without foreign keys,
  // then we create tables with foreign keys is strict order.
});

// close the database connection
db.close(err => {
  if (err) {
    return console.error(err.message);
  }
});
