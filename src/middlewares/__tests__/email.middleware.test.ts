import { mockNext, mockReq, mockRes } from '../../mocks/express';
import * as emailUtils from '../../utils/email.utils';
import { emailMiddleware } from '../email.middleware';

import { EmailErrors } from '../../constants/errors';

const mockedReq = mockReq();
const mockedRes = mockRes();
const mockedNext = mockNext();

const mockMail = 'mail@gmail.com';

const mockedValidator = jest
    .spyOn(emailUtils, 'validateEmail')
    .mockReturnValue(mockMail);

afterEach(() => {
    jest.clearAllMocks();
});

describe('Email middleware', () => {
    it('Throws an error if email was not provided', () => {
        const request = () => emailMiddleware(mockedReq, mockedRes, mockedNext);

        expect(request).toThrow(EmailErrors.noEmailProvided);
        expect(mockedNext).not.toBeCalled();
    });

    it('Works fine if email is valid', () => {
        const mockedReqClone = structuredClone(mockedReq);
        mockedReqClone.query.email = mockMail;

        emailMiddleware(mockedReqClone, mockedRes, mockedNext);

        expect(mockedNext).toBeCalled();
    });

    it('Throws an error if email was not provided', () => {
        mockedValidator.mockReturnValue(undefined);

        const mockedReqClone = structuredClone(mockedReq);
        mockedReqClone.query.email = mockMail;
        const request = () => emailMiddleware(mockedReqClone, mockedRes, mockedNext);

        expect(request).toThrow(EmailErrors.badEmailFormat);
        expect(mockedNext).not.toBeCalled();
    });
});
