import * as studentRepository from '../repository/studentRepository';
import { Student } from '../models/Student';
import { HttpError } from '../security/httpError';

export const getAllStudents = () => studentRepository.findAll();

export const getStudentById = async (id: number) => {
  if (id <= 0) throw new HttpError('Invalid student ID', 400);
  const student = await studentRepository.findById(id);
  if (!student) throw new HttpError('Student not found', 404);
  return student;
};

export const createStudent = async (student: Omit<Student, 'id'>) => {
  const existing = await studentRepository.findByEmail(student.email);
  if (existing) throw new HttpError('Email already exists', 409);
  return studentRepository.create(student);
};

export const updateStudent = async (id: number, student: Partial<Student>) => {
  if (id <= 0) throw new HttpError('Invalid student ID', 400);
  const existingStudent = await studentRepository.findById(id);
  if (!existingStudent) throw new HttpError('Student not found', 404);

  if (student.email && student.email !== existingStudent.email) {
    const emailTaken = await studentRepository.findByEmail(student.email);
    if (emailTaken) throw new HttpError('Email already exists', 409);
  }

  return studentRepository.update(id, student);
};

export const deleteStudent = async (id: number) => {
  if (id <= 0) throw new HttpError('Invalid student ID', 400);
  const existing = await studentRepository.findById(id);
  if (!existing) throw new HttpError('Student not found', 404);
  await studentRepository.remove(id);
};