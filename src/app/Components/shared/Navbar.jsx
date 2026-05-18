"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {

    const [user, setUser] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="bg-[#EDEDED] text-black border-b border-gray-200 sticky top-0 z-50 font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold tracking-tight text-black">
                            IdeaVault<span className="text-black">.</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        <Link href="/" className="hover:text-gray-600 transition-colors">Home</Link>
                        <Link href="/ideas" className="hover:text-gray-600 transition-colors">Ideas</Link>

                        {user && (
                            <>
                                <Link href="/my-ideas" className="hover:text-gray-600 transition-colors">My Ideas</Link>
                                <Link href="/interactions" className="hover:text-gray-600 transition-colors">My Interactions</Link>
                            </>
                        )}

                        {/* Divider Line */}
                        <span className="text-gray-300 h-4 w-[1.5px] bg-gray-400 block" aria-hidden="true"></span>

                        {/* Action Buttons / Profile Section */}
                        {!user ? (
                            <div className="flex items-center space-x-3">
                                <Link href="/login" className="px-5 py-2 text-sm font-medium rounded-md bg-black text-white hover:bg-gray-800 transition-all">
                                    Login
                                </Link>
                                <Link href="/register" className="px-5 py-2 text-sm font-medium rounded-md bg-black text-white hover:bg-gray-800 transition-all">
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                {/* Add Idea Button */}
                                <Link href="/add-idea" className="px-4 py-2 text-sm font-medium rounded-md bg-black text-white hover:bg-gray-800 transition-all flex items-center gap-1">
                                    <span>+</span> Add Idea
                                </Link>

                                {/* Divider Line */}
                                <span className="text-gray-300 h-4 w-[1.5px] bg-gray-400 block" aria-hidden="true"></span>

                                {/* Profile Dropdown Container (Triggered via Hover) */}
                                <div className="relative group py-2">

                                    {/* profile image */}
                                    <button className="flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-semibold text-sm border border-transparent hover:border-gray-400 transition-all focus:outline-none">
                                        N
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className="absolute right-0 mt-3 w-52 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-100 opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:invisible-none group-hover:visible group-hover:scale-100 transition-all duration-200 origin-top-right z-50">

                                        <div className="py-1">
                                            <Link href="/profile" className="block px-4 py-2.5 text-sm hover:bg-gray-50 text-gray-700 transition-colors">
                                                My Profile
                                            </Link>

                                            {/* Theme Toggle Button Placeholder */}
                                            <button
                                                onClick={() => console.log('Toggle theme')}
                                                className="w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 text-gray-700 text-left transition-colors"
                                            >
                                                <span>Theme Mode</span>
                                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">Light</span>
                                            </button>
                                        </div>

                                        <div className="py-1 border-t border-gray-100">
                                            <button
                                                onClick={() => setUser(false)}
                                                className="w-full text-left block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium transition-colors"
                                            >
                                                Log out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-black p-2 rounded-md hover:bg-gray-200 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-[#EDEDED] border-t border-gray-200 px-4 pt-2 pb-4 space-y-2 shadow-inner">
                    <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-200">Home</Link>
                    <Link href="/ideas" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-200">Ideas</Link>

                    {user ? (
                        <>
                            <Link href="/my-ideas" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-200">My Ideas</Link>
                            <Link href="/interactions" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-200">My Interactions</Link>
                            <Link href="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-200">My Profile</Link>

                            <button
                                onClick={() => console.log('Toggle theme')}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-md font-medium hover:bg-gray-50 text-gray-700 text-left transition-colors"
                            >
                                <span>Theme Mode</span>
                                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded text-gray-500">Light</span>
                            </button>

                            <div className="grid grid-cols-2 gap-2 pt-2">
                                <Link href="/add-idea" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-black hover:bg-gray-800 text-center font-semibold">+ Add Idea</Link>
                                <button onClick={() => setUser(false)} className="w-full text-center block px-3 py-2 rounded-md text-base font-medium bg-red-500 text-white hover:bg-red-600">Log out</button>
                            </div>
                        </>
                    ) : (
                        <div className="grid grid-cols-2 gap-2 pt-2">
                            <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-black hover:bg-gray-800 text-center">Login</Link>
                            <Link href="/register" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-black hover:bg-gray-800 text-center">Register</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;