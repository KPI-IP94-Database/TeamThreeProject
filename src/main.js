'use strict';

// Import needed dependencies
const fastify = require('fastify')({
  logger: true
});
const knex = require('knex');
const { urlConstructor } = require('../lib/urlConstructor.js');

// Import configs
const configuration = require('../knexfile.js');
const dbDevOptions = configuration.development;

// Decorate `knex` so it is available for every plugin
// that uses `knex`
if (!fastify.knex) {
  const connector = knex(dbDevOptions);
  fastify.decorate('knex', connector);
}

// Write list of routes
const routes = urlConstructor({
  user: {
    create: [
      'application',
      'new-user'
    ],
    // get: [
    //   'application-list',
    //   'bio'
    // ],
    // remove: 'application',
    // update: 'password'
  }
});

// Register plugin for every route
for (const route of routes) {
  const pluginPath = './routes' + route + '/index.js';
  const plugin = require(pluginPath);
  fastify.register(plugin);
}

fastify.listen(3000, (err, address) => {
  if (err) throw err;
  fastify.log.info(`Server listening on ${address}`);
});