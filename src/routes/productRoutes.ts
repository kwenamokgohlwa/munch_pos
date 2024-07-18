import { FastifyInstance } from 'fastify';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productController';
import { authenticate } from '../middleware/authMiddleware';

export default async (app: FastifyInstance) => {
  app.post('/products', { preHandler: [authenticate] }, createProduct);
  app.get('/products', { preHandler: [authenticate] }, getProducts);
  app.put('/products/:id', { preHandler: [authenticate] }, updateProduct);
  app.delete('/products/:id', { preHandler: [authenticate] }, deleteProduct);
};
