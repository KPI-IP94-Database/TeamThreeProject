'use strict';

// Import the needed package (it is exported from wrappers.js)
const sqlite3 = require('./wrappers.js').verbose();

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
    // db.run(sqlQuery) is used in the case
    // when we don't need the output data

    // Queries can be chained, for example,r
    // db.run(sqlQuery1).run(sqlQuery2)
    db.createTable({
      name: 'user',
      fields: [
        {
          name: 'id',
          type: 'INTEGER', // for example
          primary: true
        },
        {
          name: 'email',
          type: 'VARCHAR(70)'
        },
        {
          name: 'password',
          type: 'VARCHAR(255)'
        },
        {
          name: 'grade_1',
          type: 'DOUBLE'
        },
        {
          name: 'grade_2',
          type: 'DOUBLE'
        },
        {
          name: 'grade_3',
          type: 'DOUBLE'
        },
        {
          name: 'certificate',
          type: 'DOUBLE'
        }
      ]
    }).createTable({
      name: 'university',
      fields: [
        {
          name: 'id',
          type: 'INTEGER',
          primary: 'true'
        },
        {
          name: 'name',
          type: 'VARCHAR(255)'
        }
      ]
    }).createTable({
      name: 'faculty',
      fields: [
        {
          name: 'id',
          type: 'INTEGER',
          primary: 'true'
        },
        {
          name: 'name',
          type: 'VARCHAR(100)'
        },
        {
          name: 'univ_id',
          type: 'INTEGER',
          fkey: {
            table: 'university',
            pkey: 'id'
          }
        }
      ]
    }).createTable({
      name: 'specialty',
      fields: [
        {
          name: 'id',
          type: 'INTEGER',
          primary: 'true'
        },
        {
          name: 'name',
          type: 'VARCHAR(70)'
        },
        {
          name: 'fac_id',
          type: 'INTEGER',
          fkey: {
            table: 'faculty',
            pkey: 'id'
          }
        },
        {
          name: 'budget_places',
          type: 'INTEGER'
        },
        {
          name: 'commerce_places',
          type: 'INTEGER'
        },
      ]
    }).createTable({
      name: 'application',
      fields: [
        {
          name: 'id',
          type: 'INTEGER',
          primary: 'true'
        },
        {
          name: 'user_id',
          type: 'INTEGER',
          fkey: {
            table: 'user',
            pkey: 'id'
          }
        },
        {
          name: 'speciality_id',
          type: 'INTEGER',
          fkey: {
            table: 'specialty',
            pkey: 'id'
          }
        },
        {
          name: 'priority',
          type: 'INTEGER'
        }
      ]
    });
    // NOTE: first we create tables without foreign keys,
    // then we create tables with foreign keys is strict order.
  });
  return db;
};

module.exports = { initDB };
