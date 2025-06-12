import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import ForgetPassword from "./pages/forgetPassword.jsx";
import SignupPage from "./pages/signup.jsx";
import Agreement from "./pages/agreement.jsx";
import PropertyPage from "./pages/property.jsx";
import AddProperty from "./pages/add_property.jsx";
import Navbar from "./layouts/navbar.jsx";
import AuthContextProvider from "./auth/authProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

const queryClient = new QueryClient();

function App() {
    return (
        <AuthContextProvider>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Navbar />
                    <div className="pt-[70px]">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/forget-password" element={<ForgetPassword />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/agreement" element={<Agreement />} />
                            <Route path="/property" element={<PropertyPage />} />
                            <Route path="/add-property" element={<AddProperty />} />
                        </Routes>
                    </div>
                </Router>
                <ToastContainer
                    position="bottom-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </QueryClientProvider>
        </AuthContextProvider>
    );
}

export default App;
