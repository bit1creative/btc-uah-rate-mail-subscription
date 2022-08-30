import axios from 'axios';

import { rateResponseSchema } from '../schemas/rate.schema';
import { binanceUri } from '../constants';

export const getRateBTCUAH = async () => {
    const { data } = await axios({
        method: 'GET',
        url: `${binanceUri}/ticker/price`,
        params: {
            symbol: 'BTCUAH',
        },
    });

    return rateResponseSchema.parse(data);
};
