import { Request, Response, NextFunction } from 'express';
import { RateService } from '../services/rate.service';

export class RateController {
    static getRateBTCUAHController = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const price = await RateService.getRateBTCUAHService();
            if (price) return res.status(200).send(price);
            return res.status(400).send('Invalid status value');
        } catch (err) {
            next(err);
        }
    };
}
