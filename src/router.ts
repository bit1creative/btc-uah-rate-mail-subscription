import express, { Request, Response, NextFunction } from 'express'
const router = express.Router()

import { emailMiddleware } from './middlewares'
import { getRateBTCUAH } from './api/binance'
import { addEmailToDB, getEmailsFromDB } from './utils/fs'
import {sendEmails} from './utils/nodemailer'

router.get('/rate', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { price } = await getRateBTCUAH()
        if (price) res.status(200).send(price)
        res.status(400).send('Invalid status value')
    } catch (err) {
        next(err)
    }
})

router.post(
    '/subscribe',
    emailMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.query
            const { status, message } = addEmailToDB(email as string)
            res.status(status).send(message)
        } catch (err) {
            next(err)
        }
    }
)

router.post(
    '/sendEmails',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { price } = await getRateBTCUAH()
            const emails = getEmailsFromDB()

            if( price && emails.length ) {
                const info = await sendEmails(price, emails)
                if (info.rejected.length !== emails.length) {
                    res.status(200).send('E-mailʼи відправлено')
                    return
                }
            }
            throw new Error("Щось пішло не так :(")
        } catch (err) {
            next(err)
        }
    }
)

export default router
