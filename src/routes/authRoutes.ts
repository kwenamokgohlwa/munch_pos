import { FastifyInstance } from 'fastify';
import { register, login } from '../controllers/authController';

export default async (app: FastifyInstance) => {
  app.post('/register', register);
  app.post('/login', login);
};
