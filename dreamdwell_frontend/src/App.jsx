import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import ForgetPassword from "./pages/forgetPassword.jsx";
import SignupPage from "./pages/signup.jsx";
import Agreement from "./pages/agreement.jsx";
import PropertyPage from "./pages/property.jsx";
import Navbar from "./layouts/navbar.jsx";
import AuthContextProvider from "./auth/authProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

const queryClient = new QueryClient();

function App() {
    return (
        <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
            {/*<AuthContextProvider>*/}
                <Router>
                    <div className="pt-[65px]">
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/forget-password" element={<ForgetPassword />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/agreement" element={<Agreement />} />
                            <Route path="/property" element={<PropertyPage />} />
                        </Routes>
                    </div>
                </Router>
            {/*</AuthContextProvider>*/}
        </QueryClientProvider>
        </AuthContextProvider>
    );
}

export default App;
