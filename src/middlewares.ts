import { NextFunction, Request, Response } from 'express'
import { AxiosError } from 'axios'

export const errorHandlerMiddleware = (
    error: AxiosError,
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const status = error.status || 400
    response.status(+status).send(error.message)
}

export const emailMiddleware = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    if (!request.query.email) throw new Error('No email was provided')
    next()
}
