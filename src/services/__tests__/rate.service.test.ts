import { RateService } from '../rate.service';
import * as binance from '../../api/binance';

const mockPrice = '22000';

const getRateSpy = jest
    .spyOn(binance, 'getRateBTCUAH')
    .mockReturnValue(
        new Promise((res, rej) => res({ price: mockPrice, symbol: 'BTCUAH' }))
    );

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Rate service', () => {
    it('returns the price', async () => {
        const response = await RateService.getRateBTCUAHService();

        expect(response).toStrictEqual(mockPrice);
    });
});
