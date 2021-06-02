'use strict';

// Import needed dependencies
const fastify = require('fastify')({
  logger: false,
});
const knex = require('knex');

// Import and register tested plugin
const ROUTE_URL = '/';
const plugin = require('./bio.js')(ROUTE_URL);
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

describe('test inner stubs', () => {
  test('hashPassword stub should have the same interface as original', () => {
    const result = fastify.hashPassword('password', 'salt');
    expect(result.passwordHash).toBeDefined();
    expect(result.passwordSalt).toBeDefined();
  });

  test('fastify.knex should work', async () => {
    expect.assertions(1);

    const tableName = 'test';
    const fieldName = 'field';
    const fieldValue = 'value';
    const insertedObj = {
      [fieldName]: fieldValue,
    };

    await fastify.knex.schema.createTable(tableName, (table) => {
      table.string(fieldName);
    });

    await fastify.knex(tableName).insert(insertedObj);

    const result = await fastify.knex.select(fieldName).from(tableName);
    const expected = [insertedObj];

    expect(result).toEqual(expected);
  });
});

describe('bio endpoint test', () => {
  test('should return status 400 on empty properties', async () => {
    expect.assertions(1);

    const response = await fastify.inject({
      method: 'GET',
      url: ROUTE_URL,
    });

    expect(response.statusCode).toBe(400);
  });

  test('should return status 400 on only one of properties', async () => {
    expect.assertions(2);

    const responseEmail = await fastify.inject({
      method: 'GET',
      url: ROUTE_URL,
      query: {
        email: 'aboba@gmail.com',
      },
    });

    const responsePassword = await fastify.inject({
      method: 'GET',
      url: ROUTE_URL,
      query: {
        password: 'ultraSecretPassword',
      },
    });

    expect(responseEmail.statusCode).toBe(400);
    expect(responsePassword.statusCode).toBe(400);
  });

  test('should return 404 on not existing user', async () => {
    expect.assertions(1);

    const response = await fastify.inject({
      method: 'GET',
      url: ROUTE_URL,
      query: {
        email: 'this-email-does-not-exist@gmail.com',
        password: 'does-not-matter',
      },
    });

    expect(response.statusCode).toBe(404);
  });

  test('should return 403 on incorrect password', async () => {
    expect.assertions(1);

    await fastify.knex('user').insert({
      email: 'koko@gmail.com',
      password_hash: 'uraura',
      salt: 'ura',
      fullname: 'Uwuwewewe Enyuxwewewe Umgvewumem Osas',
      grade_first: '150.3',
      grade_second: '140',
      grade_third: '198',
    });

    const response = await fastify.inject({
      method: 'GET',
      url: ROUTE_URL,
      query: {
        email: 'koko@gmail.com',
        password: 'uraur',
      },
    });

    expect(response.statusCode).toBe(403);
  });

  test('should return whole body on correct password', async () => {
    expect.assertions(2);

    const statusCode = 200;

    const body = {
      email: 'koko@gmail.com',
      fullname: 'Uwuwewewe Enyuxwewewe Umgvewumem Osas',
      grade_first: 150.3,
      grade_second: 140,
      grade_third: 198,
      grade_fourth: null,
      grade_certificate: null,
      additional_score: null,
    };

    const insertedBody = {
      password_hash: 'uraura',
      salt: 'ura',
    };

    Object.assign(insertedBody, body);

    await fastify.knex('user').insert(insertedBody);

    const response = await fastify.inject({
      method: 'GET',
      url: ROUTE_URL,
      query: {
        email: insertedBody.email,
        password: insertedBody.password_hash,
      },
    });

    expect(response.statusCode).toBe(statusCode);
    expect(response.body).toEqual(
      JSON.stringify({
        statusCode,
        body,
      })
    );
  });
});
