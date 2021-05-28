'use strict';

module.exports = (url) => async (fastify) => {
  fastify.route({
    method: 'POST',
    url,
    handler: async (request, reply) => ({ hello: 'world' })
  });
};
