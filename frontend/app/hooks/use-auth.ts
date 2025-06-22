import { useMutation } from "@tanstack/react-query";
import type { registerData } from "@/routes/auth/Register";
import { postData } from "@/lib/axios";

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn : (data: registerData) => postData('/auth/register', data)
    });
}

export const useVerifyEmailMutation = () => {
    return useMutation({
        mutationFn :  (data: {token: string}) => postData('/auth/verify-email', data)
    }); 
}

export const useLoginMutation = () => {
    return useMutation({
        mutationFn : (data: {email: string, password: string}) => postData('/auth/login', data)
    });
}

export const useForgotPasswordMutation = () => {
    return useMutation({
        mutationFn : (data: {email: string}) => postData('/auth/forgot-password', data)
    });
}

export const useResetPasswordMutation = () => {
    return useMutation({
        mutationFn : (data: {token: string, newPassword: string, confirmPassword: string}) => postData('/auth/reset-password', data)
    });
}


