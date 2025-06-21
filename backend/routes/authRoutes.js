import express from 'express';
import z from 'zod';
import { validateRequest } from 'zod-express-middleware';
import { loginSchema, registerSchema, verifyEmailSchema } from '../utils/zod.js';
import { login, register, verifyEmail } from '../controllers/authController.js';



const authRouter = express.Router();

authRouter.post('/register', validateRequest({
    body: registerSchema
}), register );

authRouter.post('/login', validateRequest({
    body: loginSchema
}), login );

authRouter.post('/verify-email', validateRequest({
    body: verifyEmailSchema
}), verifyEmail);


export default authRouter;



