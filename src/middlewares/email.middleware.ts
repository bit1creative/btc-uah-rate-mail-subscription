import { NextFunction, Request, Response } from 'express';
import { validateEmail } from '../utils/email.utils';

import { EmailErrors } from '../constants/errors';

export const emailMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const { email } = request.query;
    if (!email) throw new Error(EmailErrors.noEmailProvided);
    if (!validateEmail(email as string))
        throw new Error(EmailErrors.badEmailFormat);
    next();
};
