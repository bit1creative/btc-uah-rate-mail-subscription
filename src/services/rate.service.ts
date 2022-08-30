import { getRateBTCUAH } from '../api/binance';

export class RateService {
    static getRateBTCUAHService = async () => {
        const { price } = await getRateBTCUAH();

        return price;
    };
}
