'use strict';

exports.removeApplicationById = (id, res, db) => {
  try {
    db.removeRow('applications', 'id', id);
    res.status(201).send({});
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
};

exports.getApplicationsByStudentId = (studentId, res, db) => {
  db.getObject('applications', 'studentId', studentId, row => {
    res.status(200).send(row);
  });
};

exports.editApplication = (appl, res, db) => {
  try {
    for (const key in appl) {
      db.updateById('applications', appl.id, key, appl[key]);
    }
    res.status(201).send({});
  } catch (e) {
    console.log(e);
    res.status(500).send({});
  }
};
