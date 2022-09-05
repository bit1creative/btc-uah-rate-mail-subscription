import { NextFunction, Request, Response } from 'express';

export const mockReq = () => {
    const req = {
        query: {}
    } as Request;
    return req;
};

export const mockRes = () => {
    const res = {} as Response;
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

export const mockNext = () => jest.fn() as NextFunction;
