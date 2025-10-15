"use client";
import React, { useState } from "react";

import Link from "next/link";

import { FaBars, FaTimes } from "react-icons/fa";
import LogOutBtn from "./LogOutBtn";
import { useAuth } from "./AuthProvider";

export default function Navbar() {
    const { user } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="border-b border-gray-300 bg-white  py-2">
            <div className="flex justify-between items-center  py-3 md:max-w-11/12 md:mx-auto">
                {/* Logo */}
                <div className="flex items-center gap-2">

                    <h1 className="text-[#632EE3] font-bold text-xl md:text-2xl">
                        {user?.email}
                    </h1>
                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex gap-6 items-center">
                    <Link href="/" className="hover:text-[#9F62F2] transition font-semibold">
                        Event
                    </Link>
                    <Link href="/chart" className="hover:text-[#9F62F2] transition font-semibold">
                        Chart
                    </Link>



                </nav>
                <div className="hidden md:block">
                    <LogOutBtn></LogOutBtn>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-[#9F62F2] focus:outline-none"
                >
                    {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-gray-200 shadow-md">
                    <nav className="flex flex-col items-center gap-4 py-4">
                        <Link
                            href="/"
                            className="hover:text-[#9F62F2] transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            Event
                        </Link>
                        <Link
                            href="/chart"
                            className="hover:text-[#9F62F2] transition"
                            onClick={() => setMenuOpen(false)}
                        >
                            Chart
                        </Link>

                        <LogOutBtn></LogOutBtn>
                    </nav>
                </div>
            )}
        </header>
    );
}