import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET as string;

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, jwtSecret, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
    return jwt.verify(token, jwtSecret);
};