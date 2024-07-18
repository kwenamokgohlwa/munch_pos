import Fastify from 'fastify';
import fastifyJwt from 'fastify-jwt';
import fastifySensible from 'fastify-sensible';
import { initDb } from './models';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import transactionRoutes from './routes/transactionRoutes';
import dotenv from 'dotenv';

dotenv.config();

const server = Fastify({
  logger: true,
});

server.register(fastifySensible);
server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
});

server.register(userRoutes);
server.register(productRoutes);
server.register(transactionRoutes);

const start = async () => {
  try {
    await initDb();
    await server.listen(3000);
    server.log.info(`Server listening on http://localhost:3000`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
