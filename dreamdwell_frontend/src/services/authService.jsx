import {
    registerUserApi,
    loginUserApi,
    // --- UPDATED IMPORTS FOR LINK-BASED PASSWORD RESET ---
    //sendPasswordResetLinkApi,
    resetPasswordApi
} from "../api/authApi";

export const registerUserService = async (formData) => {
    try {
        console.log(formData);
        const response = await registerUserApi(formData);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Registration Failed" };
    }
};

export const loginUserService = async (formData) => {
    try {
        const response = await loginUserApi(formData);
        return response.data;
    } catch (err) {
        throw err.response?.data || { message: "Login Failed" };
    }
};

// // --- UPDATED SERVICE FUNCTION FOR SENDING PASSWORD RESET LINK ---
// export const sendPasswordResetLinkService = async (formData) => { // Renamed from sendOtpForPasswordResetService
//     try {
//         // formData is expected to contain { email: "user@example.com" }
//         const response = await sendPasswordResetLinkApi(formData);
//         return response.data;
//     } catch (err) {
//         throw err.response?.data || { message: "Failed to send password reset link. Please try again later." };
//     }
// };
//
// // --- UPDATED SERVICE FUNCTION FOR RESETTING PASSWORD WITH TOKEN ---
// export const resetPasswordService = async (token, formData) => {
//     try {
//
//         const response = await resetPasswordApi(token, formData);
//         return response.data;
//     } catch (err) {
//         throw err.response?.data || { message: "Failed to reset password. Invalid link or other error." };
//     }
// };

//====================PForget PAssword
export  const  requestResetPasswordService = async (formData) => {
    try {
        const  response = await resetPasswordApi(formData);
        return response.data;
    }catch (err){
        throw err.response?.data|| { message: "Request  Password Failed" };
    }
}

export  const  resetPasswordService = async (formData,token) => {
    try {
        const response = await resetPasswordApi(formData, token);
        return response.data
    } catch (err) {
        throw err.response?.data || {message: "Reset Password Failed"};
    }
}