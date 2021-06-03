'use strict';

// Import needed dependencies
const fastify = require('fastify')({
  logger: true,
});
const knex = require('knex');
const { urlConstructor } = require('../lib/urlConstructor.js');
const { hashPassword } = require('../lib/passwordHasher.js');

// Import configs
const configuration = require('../knexfile.js');
const dbDevOptions = configuration.development;

// Decorate `knex` so it is available for every plugin
// that uses `knex`
if (!fastify.knex) {
  const connector = knex(dbDevOptions);
  fastify.decorate('knex', connector);
}

// Also decorate `hashPassword`
if (!fastify.hashPassword) {
  fastify.decorate('hashPassword', hashPassword);
}

// Write list of routes
const routes = urlConstructor({
  user: {
    create: ['application', 'new-user', 'new-university'],
    get: ['application-list', 'bio'],
    remove: 'application',
    update: 'password',
  },
});

// Register plugin for every route
for (const route of routes) {
  const pluginPath = './routes' + route + '.js';
  const plugin = require(pluginPath)(route);
  fastify.register(plugin);
}

// Listen on port 3000
fastify.listen(3000, (err, address) => {
  if (err) throw err;
  fastify.log.info(`Server listening on ${address}`);
});
