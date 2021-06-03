'use strict';

// Import needed dependencies
const fastify = require('fastify')({
  logger: false,
});
const knex = require('knex');

// Import and register tested plugin
const ROUTE_URL = '/user-test/';
const plugin = require('./new-user.js')(ROUTE_URL);
fastify.register(plugin);

// Import configs
const dbConfiguration = require('../../../../knexfile.js').test;

// Decorate `knex` so it is available for plugin
// that uses `knex`
if (!fastify.knex) {
  const connector = knex(dbConfiguration);
  fastify.decorate('knex', connector);
}

// hashPassword stub
const hashPassword = (password, salt) => ({
  passwordHash: password,
  passwordSalt: salt,
});

if (!fastify.hashPassword) {
  fastify.decorate('hashPassword', hashPassword);
}

beforeAll(async () => {
  await fastify.knex.schema.createTable('user', (table) => {
    table.increments('id').unsigned().primary();

    table.string('email').notNullable();

    table.string('password_hash').notNullable();

    table.string('salt').notNullable();

    table.string('fullname').notNullable();

    table.float('grade_first').notNullable();

    table.float('grade_second').notNullable();

    table.float('grade_third').notNullable();

    table.float('grade_fourth');
    table.float('grade_certificate');
    table.float('additional_score');
  });
});

afterAll(async () => {
  await fastify.close();
});

describe('new-user endpoint test', () => {
  test('should return status 400 on empty properties', async () => {
    expect.assertions(1);

    const response = await fastify.inject({
      method: 'POST',
      url: ROUTE_URL,
    });

    expect(response.statusCode).toBe(400);
  });

  test('should return status 400 on only one of properties', async () => {
    expect.assertions(2);

    const responseEmail = await fastify.inject({
      method: 'POST',
      url: ROUTE_URL,
      body: {
        email: 'test@gmail.com',
      },
    });

    const responsePassword = await fastify.inject({
      method: 'POST',
      url: ROUTE_URL,
      body: {
        password: 'something123',
      },
    });

    expect(responseEmail.statusCode).toBe(400);
    expect(responsePassword.statusCode).toBe(400);
  });


  test('should return 409 - this user already exists', async () => {
    expect.assertions(1);

    await fastify.knex('user').insert({
      email: 'test1234@gmail.com',
      password_hash: 'r3333',
      salt: 'r3333',
      fullname: 'Rick Astley',
      grade_first: 155.5,
      grade_second: 172,
      grade_third: 128,
      grade_certificate: 10.2,
    });

    const response = await fastify.inject({
      method: 'POST',
      url: ROUTE_URL,
      body: {
        email: 'test1234@gmail.com',
        password: 'r3333',

        fullname: 'Rick Astley',
        grade_first: 155.5,
        grade_second: 172,
        grade_third: 128,
        grade_certificate: 10.2,
      }
    });

    expect(response.statusCode).toBe(409);
  });

  test('should return 201 on valid user', async () => {
    expect.assertions(1);

    const response = await fastify.inject({
      method: 'POST',
      url: ROUTE_URL,
      body: {
        email: 'test1144444@gmail.com',
        password: 'r32322',

        fullname: 'Michael Stevenson1',
        grade_first: 155,
        grade_second: 172,
        grade_third: 128,
        grade_certificate: 10.2,
      }
    });

    expect(response.statusCode).toBe(201);
  });
});
