import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcryptjs';
import User from '../models/User';

export const registerUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = request.body as { email: string; password: string };

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });

  reply.send(user);
};

export const loginUser = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = request.body as { email: string; password: string };

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return reply.unauthorized();
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return reply.unauthorized();
  }

  const token = request.jwt.sign({ id: user.id, email: user.email });
  reply.send({ token });
};
