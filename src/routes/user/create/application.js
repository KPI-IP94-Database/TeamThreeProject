'use strict';

// General scheme
const schemeProps = {
  user_id: { type: 'number' },
  speciality_id: { type: 'number' },
  priority: { type: 'string' },
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
      const priorityValues = ['1', '2', '3', '4', '5', '6', '7', 'K'];
      if (!priorityValues.includes(request.body.priority)) {
        reply.code(400).send({
          statusCode: 400,
          error: 'Bar request',
          message: 'Priority value is invalid',
        });
        return;
      }

      const insertedObj = {};

      for (const key of Object.keys(request.body)) {
        insertedObj[key] = request.body[key];
      }

      insertedObj.status = 'RECEIVED';

      await fastify.knex('application').insert(insertedObj);

      reply.code(201).send({
        statusCode: 201,
        message: 'Application has been added to DB',
      });
    },
  });
};
