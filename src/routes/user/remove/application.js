'use strict';

module.exports = (url) => async (fastify) => {
  fastify.route({
    method: 'DELETE',
    url,
    handler: async (request, reply) => ({ hello: 'world' })
  });
};
