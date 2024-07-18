import { FastifyRequest, FastifyReply } from 'fastify';
import Product from '../models/Product';

export const createProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, price, description, quantity } = request.body as {
    name: string;
    price: number;
    description: string;
    quantity: number;
  };

  const product = await Product.create({ name, price, description, quantity });
  reply.send(product);
};

export const getProducts = async (request: FastifyRequest, reply: FastifyReply) => {
  const products = await Product.findAll();
  reply.send(products);
};

export const updateProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };
  const { name, price, description, quantity } = request.body as {
    name: string;
    price: number;
    description: string;
    quantity: number;
  };

  const product = await Product.findByPk(id);
  if (!product) {
    return reply.notFound();
  }

  await product.update({ name, price, description, quantity });
  reply.send(product);
};

export const deleteProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as { id: string };

  const product = await Product.findByPk(id);
  if (!product) {
    return reply.notFound();
  }

  await product.destroy();
  reply.send({ message: 'Product deleted' });
};
