import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import studentRoutes from './controllers/studentController';
import authRoutes from './controllers/authController';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/students', studentRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('CRUD Students');
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});