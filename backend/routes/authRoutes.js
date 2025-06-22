import express from 'express';
import z from 'zod';
import { validateRequest } from 'zod-express-middleware';
import { emailSchema, loginSchema, registerSchema, resetPasswordSchema, verifyEmailSchema } from '../utils/zod.js';
import { login, register, resetPassword, resetPasswordRequest, verifyEmail } from '../controllers/authController.js';



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

authRouter.post('/forgot-password', validateRequest({
    body: emailSchema
}), resetPasswordRequest);

authRouter.post('/reset-password', validateRequest({
    body: resetPasswordSchema
}), resetPassword);
        


export default authRouter;



