import { z } from 'zod';

export const rateResponseSchema = z.object({
    symbol: z.string(),
    price: z.string(),
});
