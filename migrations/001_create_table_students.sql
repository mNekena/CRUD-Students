CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    sex VARCHAR(10),
    email VARCHAR(200) UNIQUE NOT NULL,
    score NUMERIC(4, 2)
);

CREATE INDEX idx_students_email ON students(email);