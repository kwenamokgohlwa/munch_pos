import { FastifyInstance } from 'fastify';
import { registerUser, loginUser } from '../controllers/userController';

async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/register', registerUser);
  fastify.post('/login', loginUser);
}

export default userRoutes;
