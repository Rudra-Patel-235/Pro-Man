import { useMutation } from "@tanstack/react-query";
import type { registerData } from "@/routes/auth/Register";
import { postData } from "@/lib/axios";

export const useRegisterMutation = () => {
    return useMutation({
        mutationFn : (data: registerData) => postData('/auth/register', data)
    });
}

