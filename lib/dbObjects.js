'use strict';

const sqlite3 = require('./wrappers.js');
const { Database } = sqlite3;


class Viewer {
  register(email, password) {
    if (/* Database.emailAvailable(email) */) {
      //return Database.addStudent(email, password);
    } else {
      return null;
    }
  }

  login(email, password) {
    if (/* Database.сanLogin(email, password) */) {
      //return Database.getUser(email);
    } else {
      return null;
    }
  }

  viewApplications() {

  }
}


class User extends Viewer {
  #id;
  get Id () { return this.#id; }
  email;
  password;

  constructor(id, email, password) {
    this.#id = id;
    this.email = email;
    this.password = password;
  }

  Logout() {

  }
}


class Student extends User {
  grades;
  sertificate;
  applications;

  constructor(id, email, password, grades, sertificate, applications) {
    super(id, email, password);
    this.grades = grades;
    this.sertificate = sertificate;
    this.applications = applications;
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
  constructor(id, email, password) {
    super(id, email, password);
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
  #id;
  get Id () { return this.#id; }
  priority;
  studentId;
  specialityId;

  constructor(id, priority, studentId, specialityId) {
    this.#id = id;
    this.priority = priority;
    this.studentId = studentId;
    this.specialityId = specialityId;
  }
}


class Speciality {
  #id;
  get Id () { return this.#id; }
  name;
  facultyId;
  budgetPlaces;
  commercePlaces;

  constructor(id, name, budgetPlaces, commercePlaces) {
    this.#id = id;
    this.name = name;
    this.budgetPlaces = budgetPlaces;
    this.commercePlaces = commercePlaces;
  }
}


class Faculty {
  #id;
  get Id () { return this.#id; }
  name;
  universityId;

  constructor(id, name) {
    this.#id = id;
    this.name = name;
  }
}


class University {
  #id;
  get Id () { return this.#id; }
  name;

  constructor(id, name) {
    this.#id = id;
    this.name = name;
  }
}