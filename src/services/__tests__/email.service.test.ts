import { promises } from 'fs';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { EmailService } from '../email.service';
import * as fsLib from '../../libs/fs';
import * as nodemailerLib from '../../libs/nodemailer';
import * as binance from '../../api/binance';
import { EmailErrors } from '../../constants/errors';

const mockEmail = 'email@gmail.com';

const mockedGetEmailsFromDB = jest
    .spyOn(fsLib, 'getEmailsFromDB')
    .mockReturnValue(new Promise((res, rej) => res([])));

const mockedSendEmails = jest
    .spyOn(nodemailerLib, 'sendEmails')
    .mockReturnValue(
        new Promise((res, rej) =>
            res({
                rejected: [],
                envelope: {
                    from: false,
                    to: [''],
                },
                messageId: '',
                accepted: [''],
                pending: [''],
                response: '',
            } as SMTPTransport.SentMessageInfo)
        )
    );

const getRateSpy = jest
    .spyOn(binance, 'getRateBTCUAH')
    .mockReturnValue(
        new Promise((res, rej) => res({ price: '22000', symbol: 'BTCUAH' }))
    );

const mkdirSpy = jest.spyOn(promises, 'mkdir').mockImplementation(jest.fn());
const appendFileSpy = jest
    .spyOn(promises, 'appendFile')
    .mockImplementation(jest.fn());

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Email service', () => {
    describe('Add email to DB', () => {
        it('adds email if there is no emails and db', async () => {
            const response = await EmailService.addEmailToDB(mockEmail);

            expect(response).toStrictEqual({
                status: 200,
                message: 'E-mail додано',
            });

            expect(appendFileSpy).toBeCalled();
            expect(mkdirSpy).toBeCalled();
        });

        it('doesnt add email if email is already in db', async () => {
            mockedGetEmailsFromDB.mockReturnValue(
                new Promise((res, rej) => res([mockEmail]))
            );
            const response = await EmailService.addEmailToDB(mockEmail);

            expect(response).toStrictEqual({
                status: 409,
                message: mockEmail,
            });

            expect(appendFileSpy).not.toBeCalled();
            expect(mkdirSpy).not.toBeCalled();
        });

        it('add email if there is no email in db but db exists', async () => {
            mockedGetEmailsFromDB.mockReturnValue(
                new Promise((res, rej) => res(['somemail']))
            );

            const response = await EmailService.addEmailToDB(mockEmail);

            expect(response).toStrictEqual({
                status: 200,
                message: 'E-mail додано',
            });

            expect(appendFileSpy).toBeCalled();
            expect(mkdirSpy).not.toBeCalled();
        });
    });

    describe('Send emails', () => {
        it('successfully send mails', async () => {
            const response = await EmailService.sendEmails();

            expect(response).toStrictEqual({
                status: 200,
                message: 'E-mailʼи відправлено',
            });
        });

        it('throws error if no emails', async () => {
            mockedGetEmailsFromDB.mockReturnValue(
                new Promise((res, rej) => res([]))
            );

            const res = async () => await EmailService.sendEmails();

            expect(res).rejects.toThrow(EmailErrors.didntSent);
        });
    });
});
