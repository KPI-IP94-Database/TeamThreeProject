'use strict';

const sqlite3 = require('../lib/wrappers.js');
const dbObj = require('../lib/dbObjects.js');
const { initDB } = require('../lib/init.js');
const { test } = require('voda');

// Function to fill the DB, which has tables according to the model

const fillDb = db => {
  const univ1 = new dbObj.University(0, 'University of Foo');
  const univ2 = new dbObj.University(0, 'High School of Bar');

  db.insertObj(univ1);
  db.insertObj(univ2);

  const fac1 = new dbObj.Faculty(0, 'Foo Tech');
  fac1.universityId = 1;
  const fac2 = new dbObj.Faculty(0, 'Foo Chem');
  fac2.universityId = 1;
  const fac3 = new dbObj.Faculty(0, 'Foo Phys');
  fac3.universityId = 1;
  const fac4 = new dbObj.Faculty(0, 'Bar Tech');
  fac4.universityId = 2;
  const fac5 = new dbObj.Faculty(0, 'Bar Chem');
  fac5.universityId = 2;
  const fac6 = new dbObj.Faculty(0, 'Bar Phys');
  fac6.universityId = 2;

  db.insertObj(fac1);
  db.insertObj(fac2);
  db.insertObj(fac3);
  db.insertObj(fac4);
  db.insertObj(fac5);
  db.insertObj(fac6);

  const spec1 = new dbObj.Speciality(0, '121 Tech', 15, 18);
  spec1.facultyId = 1;
  const spec2 = new dbObj.Speciality(0, '69 Chem', 5, 11);
  spec2.facultyId = 1;
  const spec3 = new dbObj.Speciality(0, '88 Phys', 4, 10);
  spec3.facultyId = 1;
  const spec4 = new dbObj.Speciality(0, '121 Tech', 6, 10);
  spec4.facultyId = 2;
  const spec5 = new dbObj.Speciality(0, '69 Chem', 3, 9);
  spec5.facultyId = 2;
  const spec6 = new dbObj.Speciality(0, '88 Phys', 5, 10);
  spec6.facultyId = 2;

  db.insertObj(spec1);
  db.insertObj(spec2);
  db.insertObj(spec3);
  db.insertObj(spec4);
  db.insertObj(spec5);
  db.insertObj(spec6);

  const student1 = new dbObj.Student();
  student1.email = 'st1@gmail.com';
  student1.password = 'password';
  student1.grades[0] = 193;
  student1.grades[1] = 190;
  student1.grades[2] = 200;
  student1.certificate = 11.4;

  db.insertObj(student1);

  const student2 = new dbObj.Student();
  student2.email = 'st2@gmail.com';
  student2.password = '12345';
  student2.grades[0] = 160;
  student2.grades[1] = 178;
  student2.grades[2] = 189;
  student2.certificate = 9.3;

  db.insertObj(student2);

  const student3 = new dbObj.Student();
  student3.email = 'st3@gmail.com';
  student3.password = 'st3pas';
  student3.grades[0] = 190;
  student3.grades[1] = 178;
  student3.grades[2] = 200;
  student3.certificate = 10.6;

  db.insertObj(student3);

  const app11 = new dbObj.Application(0, 1, 1, 2);
  const app12 = new dbObj.Application(0, 2, 1, 4);
  const app21 = new dbObj.Application(0, 1, 2, 1);
  const app22 = new dbObj.Application(0, 2, 2, 3);
  const app31 = new dbObj.Application(0, 1, 3, 3);

  db.insertObj(app11);
  db.insertObj(app12);
  db.insertObj(app21);
  db.insertObj(app22);
  db.insertObj(app31);
};


// First we check the DB without any tables
const emptyDb = new sqlite3.Database(':memory:', err => {
  if (err) throw err;
});


test('Create table with no parameter')
  .fails(() => {
    emptyDb.createTable();
  })
  .throws({
    name: 'TableCreationError',
    message: 'Attempt to create table without a name'
  });

test('Create table, parameter is a void object')
  .fails(() => {
    emptyDb.createTable({});
  })
  .throws({
    name: 'TableCreationError',
    message: 'Attempt to create table without a name'
  });

test('Create table with no fields')
  .fails(() => {
    emptyDb.createTable({
      name: 'Foo'
    });
  })
  .throws({
    name: 'TableCreationError',
    message: 'Attempt to create table without fields'
  });

test('Create table with a void field')
  .fails(() => {
    emptyDb.createTable({
      name: 'Foo',
      fields: [
        { }
      ]
    });
  })
  .throws({
    name: 'TableCreationError',
    message: 'Attempt to create table with a nameless field'
  });

test('Create table with a typeless field')
  .fails(() => {
    emptyDb.createTable({
      name: 'Foo',
      fields: [
        {
          name: 'Bar'
        }
      ]
    });
  })
  .throws({
    name: 'TableCreationError',
    message: 'Attempt to create table with a typeless field Bar'
  });

test('Create table with a primary-foreign key')
  .fails(() => {
    emptyDb.createTable({
      name: 'Foo',
      fields: [
        {
          name: 'Bar',
          type: 'INTEGER',
          primary: true,
          fkey: { }
        }
      ]
    });
  })
  .throws({
    name: 'TableCreationError',
    message: 'Attempt to create table with a field Bar, which has ' +
      'primary and foreign key simultaneously'
  });

test('Create table with a foreign key, which has no references')
  .fails(() => {
    emptyDb.createTable({
      name: 'Foo',
      fields: [
        {
          name: 'Bar',
          type: 'INTEGER',
          fkey: { }
        }
      ]
    });
  })
  .throws({
    name: 'TableCreationError',
    message: 'Attempt to create table with no references in foreign key, ' +
         'field Bar'
  });

test('Create table with a valid DB model')
  .passes(() => {
    emptyDb.createTable({
      name: 'Foo',
      fields: [
        {
          name: 'Bar',
          type: 'INTEGER',
          primary: true
        }
      ]
    });
  });


// Initialize DB (this DB has tables)
const db = initDB(':memory:');
// Fill the DB
fillDb(db);


test('Insertion with no arguments')
  .fails(() => {
    db.insert();
  })
  .throws({
    name: 'InsertionError',
    message: 'Insertion failed: missing argument list'
  });

test('Insertion with the name of a table, but no inserted values')
  .fails(() => {
    db.insert('user');
  })
  .throws({
    name: 'InsertionError',
    message: 'Insertion failed: missing argument list'
  });

test('Insertion with no error, but not every field is full')
  .passes(() => {
    db.insert('user', ['pupkin_vasyl@ukr.ua', 'marcusaurelius']);
  });

db.getObject('user', 'email', 'pupkin_vasyl@ukr.ua', row => {
  test('Get the valid row for Pupkin Vasyl')
    .passes(() => row)
    .returns({
      email: 'pupkin_vasyl@ukr.ua',
      password: 'marcusaurelius'
    });
});


db.ifExists('user', 'email', 'st1@gmail.com', res => {
  test('Checking if exists user st1, inserted using fillDb()')
    .passes(() => res)
    .returns(true);
});

db.ifAssExists('user', 'email', 'st2@gmail.com', 'password', '12345', res => {
  test('Checking if exists st2 with assotiated password')
    .passes(() => res)
    .returns(true);
});

db.removeRow('user', 'email', 'st3@gmail.com')
  .ifExists('user', 'email', 'st3@gmail.com', res => {
    test('Remove user st3 and check whether he exists')
      .passes(() => res)
      .returns(false);
  });

db.update('user', 'email', 'st2@gmail.com', 'st9@gmail.com')
  .getObject('user', 'email', 'st9@gmail.com', row => {
    test('Update data for st2 (now he is st9)')
      .passes(() => row)
      .returns({
        email: 'st9@gmail.com',
        password: '12345'
      });
  });
