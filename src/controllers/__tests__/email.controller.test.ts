import { EmailController } from '../email.controller';
import { mockReq, mockRes, mockNext } from '../../mocks/express';
import { EmailService } from '../../services/email.service';

const mockResponseSent = { status: 200, message: 'success' };

const addEmailToDBSpy = jest
    .spyOn(EmailService, 'addEmailToDB')
    .mockReturnValue(new Promise((res, rej) => res(mockResponseSent)));

const sendEmailsSpy = jest
    .spyOn(EmailService, 'sendEmails')
    .mockReturnValue(new Promise((res, rej) => res(mockResponseSent)));

const mockEmail = 'email@gmail.com';

const mockedReq = mockReq();
const mockedRes = mockRes();
const mockedNext = mockNext();

describe('Email controller', () => {
    describe('subscribe', () => {
        it('send response if everything is fine', async () => {
            const mockedReqClone = structuredClone(mockedReq);
            mockedReqClone.query.email = mockEmail;
            await EmailController.subscribe(
                mockedReqClone,
                mockedRes,
                mockedNext
            );

            expect(addEmailToDBSpy).toBeCalled();
            expect(mockedRes.send).toBeCalledWith(mockResponseSent.message);
            expect(mockedRes.status).toBeCalledWith(mockResponseSent.status);
        });

        it('if catches error then sends it to the express error middleware', async () => {
            const error = new Error('error');
            addEmailToDBSpy.mockReturnValue(
                new Promise((res, rej) => rej(error))
            );
            await EmailController.subscribe(mockedReq, mockedRes, mockedNext);

            expect(mockedNext).toBeCalledWith(error);
        });
    });

    describe('sendEmails', () => {
        it('sends response if everything is fine', async () => {
            await EmailController.sendEmails(mockedReq, mockedRes, mockedNext);

            expect(sendEmailsSpy).toBeCalled();
            expect(mockedRes.send).toBeCalledWith(mockResponseSent.message);
            expect(mockedRes.status).toBeCalledWith(mockResponseSent.status);
        });

        it('if catches error then sends it to the express error middleware', async () => {
            const error = new Error('error');
            sendEmailsSpy.mockReturnValue(
                new Promise((res, rej) => rej(error))
            );
            await EmailController.sendEmails(mockedReq, mockedRes, mockedNext);

            expect(mockedNext).toBeCalledWith(error);
        });
    });
});
