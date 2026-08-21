import bcrypt from 'bcrypt';
import * as userRepository from '../repository/userRepository';
import { generateToken } from '../security/jwt';

export const registerUser = async (email: string, password: string) => {
  const existing = await userRepository.findUserByEmail(email);
  if (existing) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(password, 10);
  return userRepository.createUser(email, hashedPassword);
};

export const loginUser = async (email: string, password: string) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  return generateToken({ id: user.id, email: user.email });
};