import { pool } from '../db';
import { Student } from '../models/Student';

export const findAll = async (): Promise<Student[]> => {
  const result = await pool.query('SELECT * FROM students');
  return result.rows;
};

export const findById = async (id: number): Promise<Student | null> => {
  const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);
  return result.rows[0] || null;
};

export const create = async (student: Omit<Student, 'id'>): Promise<Student> => {
  const result = await pool.query(
    'INSERT INTO students (first_name, last_name, sex, email, score) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [student.first_name, student.last_name, student.sex, student.email, student.score]
  );
  return result.rows[0];
};

export const update = async (id: number, student: Partial<Student>): Promise<Student | null> => {
  const result = await pool.query(
    'UPDATE students SET first_name = $1, last_name = $2, sex = $3, email = $4, score = $5 WHERE id = $6 RETURNING *',
    [student.first_name, student.last_name, student.sex, student.email, student.score, id]
  );
  return result.rows[0] || null;
};

export const remove = async (id: number): Promise<boolean> => {
  const result = await pool.query('DELETE FROM students WHERE id = $1', [id]);
  return (result.rowCount ?? 0) > 0;
};
