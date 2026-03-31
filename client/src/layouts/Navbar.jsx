import React from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/30 border-b border-white/20 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                {/* Logo */}
                <div className="text-2xl font-bold tracking-wide ">
                    🌦️ WeatherDash
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
                    <Link to="/" className="hover:text-blue-600 transition">Home</Link>
                    <Link to="/forecast" className="hover:text-blue-600 transition">Forecast</Link>
                    <Link to="/about" className="hover:text-blue-600 transition">About</Link>
                </div>

                {/* Mobile Button */}
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {open && (
                <div className="md:hidden px-6 pb-4 space-y-3 text-gray-700">
                    <Link to ="/" className="block hover:text-blue-600 transition">Home</Link>
                    <Link to="/forecast" className="block hover:text-blue-600 transition">Forecast</Link>
                    <Link to="/about" className="block hover:text-blue-600 transition">About</Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;