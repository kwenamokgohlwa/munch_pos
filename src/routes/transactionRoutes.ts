import { FastifyInstance } from 'fastify';
import { createTransaction, getTransaction } from '../controllers/transactionController';
import { authenticate } from '../middleware/authMiddleware';

export default async (app: FastifyInstance) => {
  app.post('/transactions', { preHandler: [authenticate] }, createTransaction);
  app.get('/transactions/:id', { preHandler: [authenticate] }, getTransaction);
};
