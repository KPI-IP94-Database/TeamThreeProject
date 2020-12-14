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

class Viewer {
  register(email, password) {
    db.emailAvailable(email, exists => {
      if (!exists) {
        //db.addStudent(email, password);
      }
    });
  }

  login(email, password) {
    Database.сanLogin(email, password, exists => {
      if (exists) {
        //db.getUser(email);
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
  grades = [];
  sertificate = -1;
  applications = [];

  constructor(id) {
    super(id);
  }

  addMyApplication(application) {
    if (application.studentId == this.Id) {
      //return Database.addApplication(application);
    }
  }

  removeMyApplication(application) {
    if (application.studentId == this.Id) {
      //return Database.removeApplication(application.id);
    }
  }
}


class Admin extends User {
  constructor(id) {
    super(id);
  }

  removeStudent(student) {
     //return Database.removeStudent(student.id);
  }

  editStudent(student) {

  }

  removeApplication(application) {
     //return Database.removeApplication(application.id);
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

  if (obj instanceof dbObjs.Student)
    this.insert('user', [obj.email, obj.password, obj.grades[0],
      obj.grades[1], obj.grades[2], obj.certificate]);

  else if (obj instanceof dbObjs.Admin)
    this.insert('admin', [obj.email, obj.password]);

  else if (obj instanceof dbObjs.Application)
    this.insert('application', [obj.userId, obj.specialityId,
      obj.priority]);

  else if (obj instanceof dbObjs.Speciality)
    this.insert('speciality', [obj.name, obj.facultyId,
      obj.budgetPlaces, obj.commercePlaces]);

  else if (obj instanceof dbObjs.Faculty)
    this.insert('faculty', [obj.name, obj.universityId]);

  else if (obj instanceof dbObjs.University)
    this.insert('university', [obj.name]);

  else throwTE(obj);

  return this;
};

Database.prototype.removeObj = function(obj) {

  if (obj.id != undefined && obj.id >= 0) {

    let table = '';
    
    if (obj instanceof dbObjs.Student)
      table = 'user';
    else if (obj instanceof dbObjs.Admin)
      table = 'admin';
    else if (obj instanceof dbObjs.Application)
      table = 'application';
    else if (obj instanceof dbObjs.Speciality)
      table = 'speciality';
    else if (obj instanceof dbObjs.Faculty)
      table = 'faculty';
    else if (obj instanceof dbObjs.University)
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
