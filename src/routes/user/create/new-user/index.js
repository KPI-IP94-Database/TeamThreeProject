module.exports = async (fastify, options) => {
  fastify.route({
    method: 'POST',
    url: '/user/create/new-user', 
    handler: async (request, reply) => {
      return { hello: 'world' };
    }
  });
};
