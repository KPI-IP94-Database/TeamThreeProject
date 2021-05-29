'use strict';

module.exports = (url) => async (fastify) => {
  fastify.route({
    method: 'PATCH',
    url,
    handler: async (request, reply) => ({ hello: 'world' }),
  });
};
