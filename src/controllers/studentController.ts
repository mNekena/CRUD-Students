import { Router, Request, Response } from 'express';
import * as studentService from '../services/studentService';
import { authMiddleware } from "../middlewares/authMiddleware";
import { HttpError } from '../security/httpError';
import { validate } from '../middlewares/validate';
import { validateStudent } from '../validators/studentValidator';

const router = Router();
router.use(authMiddleware);

export const getAll = async (req: Request, res: Response) => {
  const students = await studentService.getAllStudents();
  res.status(200).json(students);
};

export const getOne = async (req: Request, res: Response) => {
  const student = await studentService.getStudentById(Number(req.params.id));
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.status(200).json(student);
};

export const create = async (req: Request, res: Response) => {
  const student = await studentService.createStudent(req.body);
  res.status(201).json(student);
};

export const update = async (req: Request, res: Response) => {
  const student = await studentService.updateStudent(Number(req.params.id), req.body);
  if (!student) return res.status(404).json({ message: 'Student not found' });
  res.status(200).json(student);
};

export const remove = async (req: Request, res: Response) => {
  await studentService.deleteStudent(Number(req.params.id));
  res.status(204).send();
};

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);
router.post('/', validate(validateStudent), create);
router.put('/:id', validate(validateStudent), update);

export default router;