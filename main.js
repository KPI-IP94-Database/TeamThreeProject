'use strict';

const { initDB } = require('./lib/init.js');
const dbObj = require('./lib/dbObjects.js');

const test = true;
const path = (test) ? ':memory:' : './db/data';

const db = initDB(path);
let univId = 0;

const univ1 = new dbObj.University(++univId, 'University of Foo');
const univ2 = new dbObj.University(++univId, 'High School of Bar');

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
