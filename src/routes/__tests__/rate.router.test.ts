import App from '../../app';
import request from 'supertest';
import { RateController } from '../../controllers/rate.controller';

enum MockResponses {
    'rate' = '20000'
}

jest.mock('../../controllers/rate.controller.ts', () => ({
    RateController: {
        getRateBTCUAHController: jest.fn((req, res, next) =>
            res.status(200).send(MockResponses.rate)
        ),
    },
}));

afterEach(() => {
    jest.clearAllMocks();
});

describe('Rate route', () => {
    it('route `rate` works fine and triggers the corresponding controller', async () => {
        expect(RateController.getRateBTCUAHController).not.toBeCalled();

        const response = await request(App).get('/rate');

        expect(RateController.getRateBTCUAHController).toBeCalled();
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe(MockResponses.rate);
    });
});
