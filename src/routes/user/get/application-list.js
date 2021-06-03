'use strict';

const schemeProps = {
  userid: { type: 'string' },
};

const requiredProps = Object.keys(schemeProps);

module.exports = (url) => async (fastify) => {
  fastify.route({
    method: 'GET',
    url,
    schema: {
      query: {
        type: 'object',
        propertyNames: { enum: requiredProps },
        required: requiredProps,
        properties: schemeProps,
      },
    },

    handler: async (request, reply) => {
      const existingApplications = await fastify.knex
        .select('*')
        .from('application')
        .where('user_id', request.query.userid);

      if (!existingApplications.length) {
        reply.code(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: 'There are no applications for this user',
        });
        return;
      }
      
      const replyBody = [];
      existingApplications.forEach(data => {
        const obj = {};
  
        for (const key of Object.keys(data)) {
          obj[key] = data[key];
        }

        replyBody.push(obj);
      });

      return {
        statusCode: 200,
        body: replyBody,
      };
    },
  });
};