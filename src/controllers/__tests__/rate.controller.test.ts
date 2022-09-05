import { RateController } from '../rate.controller';
import { mockReq, mockRes, mockNext } from '../../mocks/express';
import { RateService } from '../../services/rate.service';

const mockPrice = '20000';

const getRateSpy = jest
    .spyOn(RateService, 'getRateBTCUAHService')
    .mockReturnValue(new Promise((res, rej) => res(mockPrice)));

const mockedReq = mockReq();
const mockedRes = mockRes();
const mockedNext = mockNext();

describe('Rate controller', () => {
    it('fetcher rate and sends it', async () => {
        await RateController.getRateBTCUAHController(
            mockedReq,
            mockedRes,
            mockedNext
        );

        expect(getRateSpy).toBeCalled();
        expect(mockedRes.status).toBeCalledWith(200);
        expect(mockedRes.send).toBeCalledWith(mockPrice);
    });

    it('if catches error then sends it to the express error middleware', async () => {
        const error = new Error('error');
        getRateSpy.mockReturnValue(new Promise((res, rej) => rej(error)));
        await RateController.getRateBTCUAHController(
            mockedReq,
            mockedRes,
            mockedNext
        );

        expect(mockedNext).toBeCalledWith(error);
    });
});
