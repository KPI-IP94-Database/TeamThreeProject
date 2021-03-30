'use strict';

exports.getUserByEmail = (email, res, db) => {
  db.getObject('users', 'email', email, row => {
    res.status(200).send(row);
  });
};
