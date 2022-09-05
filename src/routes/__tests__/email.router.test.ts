import App from '../../app';
import request from 'supertest';
import { EmailController } from '../../controllers/email.controller';
import { emailMiddleware } from '../../middlewares/email.middleware';

enum MockResponses {
    'subscribe' = 'email@gmail.com',
    'sendEmails' = 'send',
}

jest.mock('../../controllers/email.controller.ts', () => ({
    EmailController: {
        subscribe: jest.fn((req, res, next) => {
            res.send({});
        }),
        sendEmails: jest.fn((req, res, next) => {
            res.send({});
        }),
    },
}));

jest.mock('../../middlewares/email.middleware.ts', () => ({
    emailMiddleware: jest.fn((req, res, next) => next()),
}));

afterEach(() => {
    jest.clearAllMocks();
});

describe('Email route', () => {
    it('route `subscribe` works fine and triggers the corresponding controller', async () => {
        expect(emailMiddleware).not.toBeCalled();
        expect(EmailController.subscribe).not.toBeCalled();

        await request(App).post('/subscribe');

        expect(emailMiddleware).toBeCalled();
        expect(EmailController.subscribe).toBeCalled();
    });

    it('route `sendEmails` works fine and triggers the corresponding controller', async () => {
        expect(EmailController.sendEmails).not.toBeCalled();

        await request(App).post('/sendEmails');

        expect(EmailController.sendEmails).toBeCalled();
    });
});
