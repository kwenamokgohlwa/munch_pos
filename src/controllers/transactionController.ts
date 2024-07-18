import { FastifyRequest, FastifyReply } from 'fastify';
import Transaction from '../models/transaction';
import TransactionItem from '../models/transactionItem';

export const createTransaction = async (request: FastifyRequest, reply: FastifyReply) => {
  const { products } = request.body as any;
  const transaction = await Transaction.create();
  const transactionItems = products.map((product: any) => ({
    transactionId: transaction.id,
    productId: product.id,
    quantity: product.quantity,
    price: product.price,
  }));
  await TransactionItem.bulkCreate(transactionItems);
  reply.send({ transaction, transactionItems });
};

export const getTransaction = async (request: FastifyRequest, reply: FastifyReply) => {
  const { id } = request.params as any;
  const transaction = await Transaction.findByPk(id, { include: [TransactionItem] });
  reply.send({ transaction });
};
