import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FaShoppingCart } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full bg-[#002B5B] text-white shadow-md z-50 h-[70px] px-6 md:px-12 flex items-center justify-between">
            {/* Left: Logo & Hamburger */}
            <div className="flex items-center gap-4">
                <img src={logo} alt="logo" className="h-10 object-contain" />
                <button
                    className="text-white text-3xl md:hidden"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    ☰
                </button>
            </div>

            {/* Center: Navigation Links */}
            <div
                className={`${
                    menuOpen ? "flex" : "hidden"
                } md:flex flex-col md:flex-row gap-4 md:gap-10 absolute md:static top-[70px] left-0 w-full md:w-auto bg-[#002B5B] md:bg-transparent px-6 md:px-0 py-4 md:py-0 text-center`}
            >
                <Link
                    to="/"
                    className="text-lg font-medium hover:text-blue-300 transition-colors"
                    onClick={() => setMenuOpen(false)}
                >
                    Home
                </Link>

                {/* Property Link (no dropdown) */}
                <Link
                    to="/property"
                    className="text-lg font-medium hover:text-blue-300 transition-colors"
                    onClick={() => setMenuOpen(false)}
                >
                    Property
                </Link>

                <Link
                    to="/about"
                    className="text-lg font-medium hover:text-blue-300 transition-colors"
                    onClick={() => setMenuOpen(false)}
                >
                    About Us
                </Link>
                <Link
                    to="/blog"
                    className="text-lg font-medium hover:text-blue-300 transition-colors"
                    onClick={() => setMenuOpen(false)}
                >
                    Blog
                </Link>
                <Link
                    to="/contact"
                    className="text-lg font-medium hover:text-blue-300 transition-colors"
                    onClick={() => setMenuOpen(false)}
                >
                    Contact Us
                </Link>
            </div>

            {/* Right: Cart, Profile, Auth */}
            <div className="hidden md:flex items-center gap-6">
                <div className="relative">
                    <FaShoppingCart className="text-2xl text-white" />
                    <div className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                        0
                    </div>
                </div>
                <div className="flex flex-col items-center text-center">
                    <CgProfile className="text-2xl text-white" />
                    <span className="text-sm font-medium">momin</span>
                </div>
                <div className="flex gap-4">
                    <Link
                        to="/signup"
                        className="text-white text-base font-medium hover:text-blue-300 transition-colors"
                    >
                        Signup
                    </Link>
                    <span className="text-white text-base font-medium">/</span>
                    <Link
                        to="/login"
                        className="text-white text-base font-medium hover:text-blue-300 transition-colors"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </nav>
    );
}
