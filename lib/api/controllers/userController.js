'use strict';

const db = {};

exports.getUserByEmail = email => {
  let obj;
  db.getObject('users', 'email', email, row => obj = row);
  return obj;
};
