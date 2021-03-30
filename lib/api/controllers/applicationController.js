'use strict';

const db = {};

exports.removeApplicationById = id => {
  try {
    db.removeRow('applications', 'id', id);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

exports.getApplicationsByStudentId = studentId => {
  let obj;
  db.getObject('applications', 'studentId', studentId, row => obj = row);
  return obj;
};

exports.editApplication = appl => {
  try {
    for (const key in appl) {
      db.updateById('applications', appl.id, key, appl[key]);
    }
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}
