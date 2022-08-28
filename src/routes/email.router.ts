import express from 'express';
const router = express.Router();

import { EmailController } from '../controllers/email.controller';
import { emailMiddleware } from '../middlewares/email.middleware';

router.post('/subscribe', emailMiddleware, EmailController.subscribe);

router.post('/sendEmails', EmailController.sendEmails);

export default router;
