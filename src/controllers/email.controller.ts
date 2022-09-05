import { Request, Response, NextFunction } from 'express';
import { EmailService } from '../services/email.service';

export class EmailController {
    static subscribe = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { email } = req.query;
            const { status, message } = await EmailService.addEmailToDB(
                email as string
            );
            return res.status(status).send(message);
        } catch (err) {
            next(err);
        }
    };

    static sendEmails = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const { status, message } = await EmailService.sendEmails();
            res.status(status).send(message);
        } catch (err) {
            next(err);
        }
    };
}
