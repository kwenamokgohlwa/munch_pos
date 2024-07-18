import { FastifyRequest, FastifyReply } from 'fastify';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { generateJwt } from '../utils/jwt';

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = request.body as any;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ email, password: hashedPassword });
  reply.send({ user });
};

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = request.body as any;
  const user = await User.findOne({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return reply.status(401).send({ message: 'Invalid email or password' });
  }
  const token = generateJwt(user);
  reply.send({ token });
};
