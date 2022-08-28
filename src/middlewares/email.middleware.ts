import { NextFunction, Request, Response } from 'express';
import { validateEmail } from '../utils/email.utils';

export const emailMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { email } = request.query;
    if (!email) throw new Error('No email was provided');
    if (!validateEmail(email as string))
        throw new Error('Bad email format provided');
    next();
};
