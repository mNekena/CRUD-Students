import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import * as userRepository from '../repository/userRepository';
import { generateToken } from '../utils/jwt';

const router = Router();

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser)
    return res.status(409).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepository.createUser(email, hashedPassword);

    res.status(201).json(newUser);
  };

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

    const user = await userRepository.findUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: 'Invalid email or password' });

    const token = generateToken({ id: user.id, email: user.email });
    res.status(200).json({ token });
  }

  router.post('/register', register);
  router.post('/login', login);

  export default router;