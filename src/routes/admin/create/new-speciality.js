'use strict';

// General scheme
const schemeProps = {
  name: { type: 'string' },
  faculty_id: { type: 'number' },
  budget_places: { type: 'number' },
  commerce_places: { type: 'number' },
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
        .from('speciality')
        .where('name', request.body.name)
        .where('faculty_id', request.body.faculty_id);

      if (existing.length) {
        reply.code(409).send({
          statusCode: 409,
          error: 'Conflict',
          message:
            'Speciality with such name already exists for this faculty_id',
        });
        return;
      }

      const {
        name,
        faculty_id,
        budget_places,
        commerce_places,
      } = request.body;

      await fastify.knex('speciality').insert({
        name,
        faculty_id,
        budget_places,
        commerce_places,
      });

      reply.code(201).send({
        statusCode: 201,
        message: 'The faculty is added to DB',
      });
    },
  });
};
