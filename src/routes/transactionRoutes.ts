import { FastifyInstance } from 'fastify';
import { createTransaction, getTransactions } from '../controllers/transactionController';

async function transactionRoutes(fastify: FastifyInstance) {
  fastify.post('/transactions', { preValidation: [fastify.authenticate] }, createTransaction);
  fastify.get('/transactions', { preValidation: [fastify.authenticate] }, getTransactions);
}

export default transactionRoutes;
