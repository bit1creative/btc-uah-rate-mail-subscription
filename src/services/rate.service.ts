import axios from 'axios';
import { BINANCE_URI } from '../constants';
import { rateResponseSchema } from '../schemas/rate.schema';

export class RateService {
    static getRateBTCUAHService = async () => {
        const { data } = await axios({
            method: 'GET',
            url: `${BINANCE_URI}/ticker/price`,
            params: {
                symbol: 'BTCUAH',
            },
        });

        return rateResponseSchema.parse(data);
    };
}
