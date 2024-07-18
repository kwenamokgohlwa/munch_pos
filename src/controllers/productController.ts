import { FastifyRequest, FastifyReply } from 'fastify';
import Product from '../models/product';

export const createProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const { name, price, description, quantity } = request.body as any;
  const product = await Product.create({ name, price, description, quantity });
  reply.send({ product });
};

export const getProducts = async (request: FastifyRequest, reply: FastifyReply) => {
  const products = await Product.findAll();
  reply.send({ products });
};

export const updateProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as any;
  const { name, price, description, quantity } = request.body as any;
  const product = await Product.update({ name, price, description, quantity }, { where: { id } });
  reply.send({ product });
};

export const deleteProduct = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as any;
  await Product.destroy({ where: { id } });
  reply.send({ message: 'Product deleted' });
};
