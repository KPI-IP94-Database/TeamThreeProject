'use strict';

// Upscaling...
// Why not to make files inside lib/ global, too?
const { hashPassword } = require('../../../../lib/passwordHasher.js');

// Common scheme for response
const responseScheme = {
  type: 'object',
  required: [ 'statusCode', 'message' ],
  properties: {
    statusCode: { type: 'number' },
    error: { type: 'string' },
    message: { type: 'string' }
  }
};

// Common scheme for one of 4 grades
const gradeType = {
  type: 'number',
  minimum: 100,
  maximum: 200,
};

// General scheme
const schemeProps = {
  email: { type: 'string' },
  password: { type: 'string' },
  fullname: { type: 'string' },

  grade_first: gradeType,
  grade_second: gradeType,
  grade_third: gradeType,

  // The average of school subjects
  grade_certificate: {
    type: 'number',
    minimum: 0,
    maximum: 12,
  }
};

const requiredProps = Object.keys(schemeProps);

// Additional props
Object.assign(schemeProps, {
  grade_fourth: gradeType,

  // The only score which is added to the average
  // can be achieved: 10.
  // Other additional scores are added to one of
  // the grades, so DB will save the total of grades.
  //
  // JSON Scheme does not have validation keyword for
  // the only value, so we have a workaround: equal
  // minimum and maximum.
  additional_score: {
    type: 'number',
    minimum: 10,
    maximum: 10
  }
});

const acceptedProps = Object.keys(schemeProps);


module.exports = (url) => async (fastify, options) => {
  fastify.route({
    method: 'POST',
    url,
    schema: {
      body: {
        type: 'object',
        propertyNames: { enum: acceptedProps },
        required: requiredProps,
        properties: schemeProps
      },
      response: {
        // If the request fails scheme validation,
        // Fastify automatically returns status 400

        // Successful insert
        201: responseScheme,

        // Duplicate data
        409: responseScheme,
      }
    },

    handler: async (request, reply) => {
      const existingEmails = await fastify.knex.select('email')
        .from('user')
        .where('email', request.body.email);

      if (existingEmails.length) {
        reply.code(409).send({
          statusCode: 409,
          error: 'Conflict',
          message: 'The user already exists',
        });
        return;
      }

      const hashContainer = hashPassword(request.body.password);
      const insertedObj = {
        password_hash: hashContainer.passwordHash,
        salt: hashContainer.passwordSalt
      };

      const keys = Object.keys(request.body)
        .filter((key) => key !== 'password');

      for (const key of keys) {
        insertedObj[key] = request.body[key];
      }

      await fastify.knex('user').insert(insertedObj);

      reply.code(201).send({
        statusCode: 201,
        message: 'The user is added to DB',
      });
    }

  });
};

