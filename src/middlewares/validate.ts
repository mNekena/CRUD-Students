import { Request, Response, NextFunction } from 'express';

type ValidatorFn = (data: any) => { isValid: boolean; message?: string };

export const validate = (validator: ValidatorFn) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = validator(req.body);
        if (!result.isValid) {
            return res.status(400).json({ message: result.message });
        }
        next();
    };
};