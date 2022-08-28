import { NextFunction, Request, Response } from 'express';
import { AxiosError } from 'axios';

export const errorHandlerMiddleware = (
    error: AxiosError,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const status = error.status || 400;
    response.status(+status).send(error.message);
};
