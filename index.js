'use strict';

const { initDB, initAPI } = require('./lib/init.js');
const sqlite = require('./lib/wrappers.js');

const db = initDB(':memory:');
initAPI(db);
