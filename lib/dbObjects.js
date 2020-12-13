'use strict';

const sqlite3 = require('./wrappers.js');
const { Database } = sqlite3;

class Viewer {
  register(email, password) {
    if (false/* Database.emailAvailable(email) */) {
      //return Database.addStudent(email, password);
    } else {
      return null;
    }
  }

  login(email, password) {
    if (false/* Database.сanLogin(email, password) */) {
      //return Database.getUser(email);
    } else {
      return null;
    }
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

exports.Viewer = Viewer;
exports.User = User;
exports.Student = Student;
exports.Admin = Admin;
exports.Application = Application;
exports.Speciality = Speciality;
exports.Faculty = Faculty;
exports.University = University;
