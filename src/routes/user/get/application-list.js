'use strict';

module.exports = (url) => async (fastify) => {
  fastify.route({
    method: 'GET',
    url,
    handler: async (request, reply) => ({ hello: 'world' }),
  });
};
