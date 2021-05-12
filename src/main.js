'use strict';

// Import needed dependencies
const fastify = require('fastify')({
  logger: true
});
const knex = require('knex');

// Import configs
const configuration = require('../knexfile.js');
const dbDevOptions = configuration.development;

// Decorate `knex` so it is available for every plugin
// that uses `knex`
if (!fastify.knex) {
  const connector = knex(dbDevOptions);
  fastify.decorate('knex', connector);
}
