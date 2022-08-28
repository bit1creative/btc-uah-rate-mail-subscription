import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

import emailRouter from './routes/email.router';
import rateRouter from './routes/rate.router';

import { errorHandlerMiddleware } from './middlewares/error.middleware';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(errorHandlerMiddleware);

app.get('/status', (req: Request, res: Response) => {
    res.status(200).send({ status: true });
});

app.use(emailRouter);
app.use(rateRouter);

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
