import { useMutation } from "@tanstack/react-query";
import { requestResetPasswordService, resetPasswordService } from '../services/authService';
import {toast} from "react-toastify";


// export const useSendPasswordResetLink = () => { // Hook name updated
//     return useMutation({
//         mutationFn: sendPasswordResetLinkService, // Using the new service function
//         mutationKey: ['send-password-reset-link'],
//         onSuccess: (data) => {
//             console.log("Success data:", data);
//         },
//         onError: (err) => {
//             console.error("useSendPasswordResetLink error:", err);
//             // Error message handled in the component
//         }
//     });
// };
//
// // This hook is for resetting the password using the token from the link
// export const useResetPassword = () => { // Hook name updated
//     return useMutation({
//         // The mutationFn now expects an object containing 'token' and password fields
//         mutationFn: ({ token, newPassword, confirmPassword }) => resetPasswordService(token, { newPassword, confirmPassword }),
//         mutationKey: ['reset-password'],
//         onSuccess: (data) => {
//             console.log("Success data:", data); // Now 'data' is used
//             // Success message handled in the component
//         },
//         onError: (err) => {
//             console.error("useResetPassword error:", err);
//             // Error message handled in the component
//         }
//     });
// };


export const userResetPassword = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useMutation(
        {
            mutationFn:requestResetPasswordService,
            mutationKey: ['reset-password'],
            onSuccess:(data)=>{
                toast.success(data?.message|| "Email Sent");
            },
            onError:(err)=>{
                toast.error(err?.message || "Email Sent Failed");
            }
        })

}

export const useResetPassword = () => {
    return useMutation(
        {
            mutationFn:["reset-password"],
            mutationKey:({data,token}) => resetPasswordService(data,token),
            onSuccess:(data)=>{
                toast.success(data?.message|| "Reset Successful");
            },
            onError:(err)=>{
                toast.error(err?.message || "Password reset Failed");
            }

        }
    )
}