import axios from 'axios';
import { z } from 'zod';

import { BINANCE_URI } from '../constants';

const rateSchema = z.object({
    symbol: z.string(),
    price: z.string(),
});

export const getRateBTCUAH = async () => {
    const { data } = await axios({
        method: 'GET',
        url: `${BINANCE_URI}/ticker/price`,
        params: {
            symbol: 'BTCUAH',
        },
    });

    return rateSchema.parse(data);
};
