import express from 'express';
import { ClerkWebhooks } from '../controllers/UserController.js';

const userRouter = express.Router()

userRouter.post('/webhooks', ClerkWebhooks)

export default userRouter