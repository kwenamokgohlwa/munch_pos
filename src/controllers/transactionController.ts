import { FastifyRequest, FastifyReply } from 'fastify';
import Transaction from '../models/Transaction';
import TransactionItem from '../models/TransactionItem';
import Product from '../models/Product';

export const createTransaction = async (request: FastifyRequest, reply: FastifyReply) => {
  const { userId, items } = request.body as {
    userId: number;
    items: { productId: number; quantity: number }[];
  };

  let totalAmount = 0;
  const transactionItems = [];

  for (const item of items) {
    const product = await Product.findByPk(item.productId);
    if (!product) {
      return reply.notFound(`Product with id ${item.productId} not found`);
    }

    totalAmount += product.price * item.quantity;
    transactionItems.push({
      productId: product.id,
      quantity: item.quantity,
      price: product.price,
    });
  }

  const transaction = await Transaction.create({ userId, totalAmount });
  for (const item of transactionItems) {
    await TransactionItem.create({ ...item, transactionId: transaction.id });
  }

  reply.send(transaction);
};

export const getTransactions = async (request: FastifyRequest, reply: FastifyReply) => {
  const transactions = await Transaction.findAll({
    include: [{ model: TransactionItem, include: [Product] }],
  });
  reply.send(transactions);
};
