'use strict';

const sqlite3 = require('./wrappers.js');
const { Database, throwET } = sqlite3;

//throwTypeException
const throwTE = (obj, expectedType = '') => {
  const expected = expectedType === '' ? '' : 'Expected ' + expectedType;
  throwET('Invalid Type ' + obj.constructor.name,
    expected);
};

Database.prototype.emailAvailable = function(email, callback) {
  this.ifExists('user', 'email', email, callback)
};

Database.prototype.canLogin = function(email, password, callback) {
  this.ifAssExists('user', 'email', email, 'password', password, callback);
};

Database.prototype.getUser = function(email, callback) {
  this.getObject('user', 'email', email, callback);
};

class Viewer {
  register(dbInst, email, password) {
    dbInst.emailAvailable(email, exists => {
      if (!exists) {
        const s = new Student();
        s.email = email;
        s.password = password;
        dbInst.insertObj(s);
      }
    });
  }

  login(dbInst, email, password, callback) {
    dbInst.сanLogin(email, password, exists => {
      if (exists) {
        dbInst.getUser(email, callback);
      }
    });
  }

  viewApplications() {

  }
}


class User extends Viewer {
  id = -1;
  email = '';
  password = '';

  constructor(id) {
    super();
    this.id = id;
  }

  Logout() {

  }
}


class Student extends User {
  grades = [-1, -1, -1];
  certificate = -1;
  applications = [];

  constructor(id) {
    super(id);
  }

  addMyApplication(dbInst, application) {
    if (application.studentId == this.id) {
      dbInst.insertObj(application);
    }
  }

  removeMyApplication(dbInst, application) {
    if (application.studentId == this.Id) {
      dbInst.removeObj(application);
    }
  }
}


class Admin extends User {
  constructor(id) {
    super(id);
  }

  removeStudent(dbInst, student) {
    dbInst.removeObj(student);
  }

  editStudent(student) {

  }

  removeApplication(dbInst, application) {
    dbInst.removeObj(application);
  }
}


class Application {
  id;
  priority;
  studentId;
  specialityId;

  constructor(id, priority, studentId, specialityId) {
    this.id = id;
    this.priority = priority;
    this.studentId = studentId;
    this.specialityId = specialityId;
  }
}


class Speciality {
  id;
  name;
  facultyId;
  budgetPlaces;
  commercePlaces;

  constructor(id, name, budgetPlaces, commercePlaces) {
    this.id = id;
    this.name = name;
    this.budgetPlaces = budgetPlaces;
    this.commercePlaces = commercePlaces;
  }
}


class Faculty {
  id;
  name;
  universityId;

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}


class University {
  id;
  name;

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

Database.prototype.insertObj = function(obj) {

  if (obj instanceof Student)
    this.insert('user', [obj.email, obj.password, obj.grades[0],
      obj.grades[1], obj.grades[2], obj.certificate]);

  else if (obj instanceof Admin)
    this.insert('admin', [obj.email, obj.password]);

  else if (obj instanceof Application)
    this.insert('application', [obj.studentId, obj.specialityId,
      obj.priority]);

  else if (obj instanceof Speciality)
    this.insert('speciality', [obj.name, obj.facultyId,
      obj.budgetPlaces, obj.commercePlaces]);

  else if (obj instanceof Faculty)
    this.insert('faculty', [obj.name, obj.universityId]);

  else if (obj instanceof University)
    this.insert('university', [obj.name]);

  else throwTE(obj);

  return this;
};

Database.prototype.removeObj = function(obj) {

  if (obj.id != undefined && obj.id >= 0) {

    let table = '';
    
    if (obj instanceof Student)
      table = 'user';
    else if (obj instanceof Admin)
      table = 'admin';
    else if (obj instanceof Application)
      table = 'application';
    else if (obj instanceof Speciality)
      table = 'speciality';
    else if (obj instanceof Faculty)
      table = 'faculty';
    else if (obj instanceof University)
      table = 'university';
    else
      throwTE(obj);
    
    this.remove(table, 'id', obj.id);
  }
  else throwTE(obj);

  return this;
};

exports.Viewer = Viewer;
exports.User = User;
exports.Student = Student;
exports.Admin = Admin;
exports.Application = Application;
exports.Speciality = Speciality;
exports.Faculty = Faculty;
exports.University = University;
