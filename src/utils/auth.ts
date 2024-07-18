import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export const authenticate = async (fastify: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.send(err);
  }
};
