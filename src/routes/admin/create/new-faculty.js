'use strict';

// General scheme
const schemeProps = {
  name: { type: 'string' },
  university_id: { type: 'number' },
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
        .from('faculty')
        .where('name', request.body.name)
        .where('university_id', request.body.university_id);

      if (existing.length) {
        reply.code(409).send({
          statusCode: 409,
          error: 'Conflict',
          message:
            'Faculty with such name already exists for this university_id',
        });
        return;
      }

      await fastify.knex('faculty').insert({
        name: request.body.name,
        university_id: request.body.university_id,
      });

      reply.code(201).send({
        statusCode: 201,
        message: 'The faculty is added to DB',
      });
    },
  });
};
