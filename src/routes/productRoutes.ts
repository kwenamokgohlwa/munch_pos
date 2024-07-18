import { FastifyInstance } from 'fastify';
import { createProduct, getProducts, updateProduct, deleteProduct } from '../controllers/productController';

async function productRoutes(fastify: FastifyInstance) {
  fastify.post('/products', { preValidation: [fastify.authenticate] }, createProduct);
  fastify.get('/products', getProducts);
  fastify.put('/products/:id', { preValidation: [fastify.authenticate] }, updateProduct);
  fastify.delete('/products/:id', { preValidation: [fastify.authenticate] }, deleteProduct);
}

export default productRoutes;
