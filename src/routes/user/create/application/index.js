module.exports = async (fastify, options) => {
  fastify.route({
    method: 'POST',
    url: '/user/create/application', 
    handler: async (request, reply) => {
      return { hello: 'world' };
    }
  });
};
