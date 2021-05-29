'use strict';

const schemeProps = {
  email: { type: 'string' },
  password: { type: 'string' },
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
      const existingUsers = await fastify.knex
        .select('*')
        .from('user')
        .where('email', request.query.email);

      if (!existingUsers.length) {
        reply.code(404).send({
          statusCode: 404,
          error: 'Not Found',
          message: 'There is no user with this email',
        });
        return;
      }

      // Every user has unique email
      const userData = existingUsers[0];

      const { passwordHash } = fastify.hashPassword(
        request.query.password,
        userData.salt
      );

      if (passwordHash !== userData.password_hash) {
        reply.code(403).send({
          statusCode: 403,
          error: 'Forbidden',
          message: 'Try again',
        });
        return;
      }

      const secretProps = ['id', 'password_hash', 'salt'];

      const replyKeys = Object.keys(userData).filter(
        (key) => !secretProps.includes(key)
      );

      const replyBody = {};
      for (const key of replyKeys) {
        replyBody[key] = userData[key];
      }

      return {
        statusCode: 200,
        body: replyBody,
      };
    },
  });
};
