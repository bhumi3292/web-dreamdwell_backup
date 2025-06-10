import { useMutation } from "@tanstack/react-query";
import { registerUserService } from "../../services/authService.jsx";
import { toast } from "react-toastify";

export const useRegisterUserTan = () => {
    return useMutation({
        mutationFn: registerUserService,
        mutationKey: ['register'],
        onSuccess: (data) => {
            toast.success(data.message || "Registration Successful");
        },
        onError: (err) => {
            toast.error(err.message || "Registration Failed");
        }
    });
};
