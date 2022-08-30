import express from 'express';
const router = express.Router();
import { RateController } from '../controllers/rate.controller';

router.get('/rate', RateController.getRateBTCUAHController);

export default router;
