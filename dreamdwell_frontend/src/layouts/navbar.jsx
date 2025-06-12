import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { AuthContext } from "../auth/authProvider";
import { toast } from "react-toastify";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { isAuthenticated, user, logout, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    if (loading) return null; // Prevent flicker on page reload

    const handleLogout = () => {
        logout();
        toast.info("You've been logged out successfully!");
        setMenuOpen(false);
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 w-full bg-[#002B5B] text-white shadow-md z-50 h-[70px] px-6 md:px-12 flex items-center justify-between">
            {/* Logo & Mobile Toggle */}
            <div className="flex items-center gap-4">
                <Link to="/" onClick={() => setMenuOpen(false)}>
                    <img src={logo} alt="logo" className="h-10 object-contain" />
                </Link>
                <button
                    className="text-white text-3xl md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle mobile menu"
                >
                    ☰
                </button>
            </div>

            {/* Nav Links */}
            <div
                className={`${
                    menuOpen ? "flex" : "hidden"
                } md:flex flex-col md:flex-row gap-4 md:gap-10 absolute md:static top-[70px] left-0 w-full md:w-auto bg-[#002B5B] md:bg-transparent px-6 md:px-0 py-4 md:py-0 text-center`}
            >
                <Link to="/" className="text-lg font-medium hover:text-blue-300" onClick={() => setMenuOpen(false)}>Home</Link>
                <Link to="/property" className="text-lg font-medium hover:text-blue-300" onClick={() => setMenuOpen(false)}>Property</Link>

                {isAuthenticated && user?.role === 'Landlord' && (
                    <Link to="/add-property" className="text-lg font-medium hover:text-blue-300" onClick={() => setMenuOpen(false)}>Add Property</Link>
                )}

                <Link to="/about" className="text-lg font-medium hover:text-blue-300" onClick={() => setMenuOpen(false)}>About Us</Link>
                <Link to="/blog" className="text-lg font-medium hover:text-blue-300" onClick={() => setMenuOpen(false)}>Blog</Link>
                <Link to="/contact" className="text-lg font-medium hover:text-blue-300" onClick={() => setMenuOpen(false)}>Contact Us</Link>
            </div>

            {/* Cart, Profile, Auth Buttons */}
            <div className="hidden md:flex items-center gap-6">
                <div className="relative">
                    <FaShoppingCart className="text-2xl text-white" />
                    <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                        0
                    </div>
                </div>
                <div className="flex flex-col items-center text-center">
                    <CgProfile className="text-2xl text-white" />
                    {isAuthenticated ? (
                        <span className="text-sm font-medium">{user?.fullName}</span>
                    ) : (
                        <span className="text-sm font-medium">Profile</span>
                    )}
                </div>
                <div className="flex gap-4">
                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="bg-transparent text-white border border-white px-3 py-1 rounded-full text-base font-medium hover:bg-white hover:text-[#002B5B] transition-colors"
                        >
                            Logout
                        </button>
                    ) : (
                        <>
                            <Link to="/signup" className="bg-transparent text-white border border-white px-3 py-1 rounded-full text-base font-medium hover:bg-white hover:text-[#002B5B] transition-colors">Signup</Link>
                            <Link to="/login" className="bg-transparent text-white border border-white px-3 py-1 rounded-full text-base font-medium hover:bg-white hover:text-[#002B5B] transition-colors">Login</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
