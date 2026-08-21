import { Router, Request, Response } from 'express';
import * as authService from '../services/authService';
import { validate } from '../middlewares/validate';
import { validateAuth } from '../validators/authValidator';

const router = Router();

const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.registerUser(email, password);
  res.status(201).json(user);
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await authService.loginUser(email, password);
  res.status(200).json({ token });
};

router.post('/register', register);
router.post('/login', login);
router.post('/register', validate(validateAuth), register);
router.post('/login', validate(validateAuth), login);

export default router;