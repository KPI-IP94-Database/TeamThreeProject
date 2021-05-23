'use strict';

module.exports = (url) => async (fastify, options) => {
  fastify.route({
    method: 'POST',
    url,
    handler: async (request, reply) => ({ hello: 'world' })
  });
};
