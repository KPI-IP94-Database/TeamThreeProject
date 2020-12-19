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
