import React, { useState } from "react";
import Navbar from "../layouts/navbar.jsx";
import "../styles/forgetPassword.css";
import logo from "../assets/logo.png";

function ForgetPassword() {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement the password reset logic here (e.g., Firebase auth)
        console.log("Password reset link sent to:", email);
    };

    return (
        <>
            <Navbar />
            <div className="forget-container">
                <div className="forget-left">
                    <img src={logo} alt="DreamDwell Logo" className="forget-logo" />
                    <h2 className="branding-title">Reset Your Password</h2>
                    <p className="branding-subtitle">
                        Enter your email, and we'll send you a link to reset your password.
                    </p>
                </div>

                <div className="forget-right">
                    <div className="forget-box">
                        <h1 className="forget-title">Reset Password</h1>
                        <form className="forget-form" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="E-mail"
                                className="forget-input"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button type="submit" className="forget-button">Send Reset Link</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ForgetPassword;
