'use strict';


// General scheme
const schemeProps = {
  name: { type: 'string' },
};

const requiredProps = Object.keys(schemeProps);
const acceptedProps = Object.keys(schemeProps);

module.exports = (url) => async (fastify) => {
  fastify.route({
    method: 'POST',
    url,
    schema: {
      body: {
        type: 'object',
        propertyNames: { enum: acceptedProps },
        required: requiredProps,
        properties: schemeProps,
      },
    },

    handler: async (request, reply) => {
      const existing = await fastify.knex
        .select()
        .from('university')
        .where('name', request.body.name);

      if (existing.length) {
        reply.code(409).send({
          statusCode: 409,
          error: 'Conflict',
          message: 'University with such name already exists',
        });
        return;
      }

      await fastify.knex('university').insert({ name: request.body.name });

      reply.code(201).send({
        statusCode: 201,
        message: 'The university is added to DB',
      });
    },
  });
};
