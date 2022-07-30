import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'

import router from './router'
import { errorHandlerMiddleware } from './middlewares'

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(errorHandlerMiddleware)

app.get('/status', (req: Request, res: Response) => {
    res.status(200).send({ status: true })
})

app.use(router)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
