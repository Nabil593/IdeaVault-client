"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { Avatar } from '@heroui/react';
import { toast } from 'sonner';
import NavLink from './NavLink';

const Navbar = () => {

    const router = useRouter();

    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = authClient.useSession();

    const user = session?.user;

    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    //Logout function
    const handleLogout = async () => {
        try {
            await authClient.signOut({
                fetchOptions: {
                    onSuccess: () => {
                        router.push("/login");
                        setIsMobileMenuOpen(false);
                    },
                },
            });
            toast.success("Logged out successfully!");
        } catch (error) {
            console.error("Error during logout:", error);
            toast.error("Failed to log out.");
        }
    }

    // Theme toggle function
    const renderThemeToggle = (isMobile = false) => {
        if (!mounted) return null;
        const isDark = theme === 'dark';

        if (isMobile) {
            return (
                <button
                    onClick={() => setTheme(isDark ? 'light' : 'dark')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-md font-medium hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200 text-left transition-colors"
                >
                    <span>Theme Mode</span>
                    <span className="text-xs bg-gray-100 dark:bg-zinc-700 px-2 py-0.5 rounded text-gray-500 dark:text-gray-300">
                        {isDark ? 'Dark' : 'Light'}
                    </span>
                </button>
            );
        }

        return (
            <button
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200 transition-colors focus:outline-none"
                title="Toggle Theme"
            >
                {isDark ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707.707m2.828 5.657a4 4 0 118 0 4 4 0 01-8 0z" />
                    </svg>
                ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                )}
            </button>
        );
    };

    return (
        <nav className="bg-[#EDEDED] dark:bg-[#121212] text-black dark:text-white border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold tracking-tight text-black dark:text-white">
                            IdeaVault<span className="text-black dark:text-white">.</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6 text-sm font-medium">
                        <NavLink href="/" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Home</NavLink>
                        <NavLink href="/ideas" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">Ideas</NavLink>

                        {user && (
                            <>
                                <NavLink href="/my-ideas" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">My Ideas</NavLink>
                                <NavLink href="/interactions" className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors">My Interactions</NavLink>
                            </>
                        )}

                        {/* Divider Line */}
                        <span className="text-gray-300 dark:text-gray-600 h-4 w-[1.5px] bg-gray-400 block" aria-hidden="true"></span>

                        {/* Theme Toggle Button (Always visible on desktop) */}
                        {renderThemeToggle()}

                        {!user ? (
                            <div className="flex items-center space-x-3">
                                <Link href="/login" className="px-5 py-2 text-sm font-medium rounded-md bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all">
                                    Login
                                </Link>
                                <Link href="/register" className="px-5 py-2 text-sm font-medium rounded-md bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all">
                                    Register
                                </Link>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">

                                <span className="text-gray-300 dark:text-gray-600 h-4 w-[1.5px] bg-gray-400 block" aria-hidden="true"></span>

                                <Link href="/add-idea" className="px-4 py-2 text-sm font-medium rounded-md bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all flex items-center gap-1">
                                    <span>+</span> Add Idea
                                </Link>

                                <span className="text-gray-300 dark:text-gray-600 h-4 w-[1.5px] bg-gray-400 block" aria-hidden="true"></span>

                                {/* Profile Dropdown */}
                                <div className="relative group py-2">
                                    <button className="flex items-center justify-center rounded-full border border-transparent group-hover:border-gray-400 transition-all focus:outline-none overflow-hidden">
                                        <Avatar className="w-10 h-10">
                                            <Avatar.Image
                                                alt={user?.name || "John Doe"}
                                                src={user?.image}
                                                referrerPolicy="no-referrer"
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                            
                                            <Avatar.Fallback className="w-10 h-10 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black text-sm font-semibold rounded-full">
                                                {user?.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "JD"}
                                            </Avatar.Fallback>
                                        </Avatar>
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className="absolute right-0 mt-3 w-52 bg-white dark:bg-zinc-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-xl border border-gray-100 dark:border-zinc-800 opacity-0 invisible scale-95 group-hover:opacity-100 group-hover:visible group-hover:scale-100 transition-all duration-200 origin-top-right z-50">
                                        <div className="py-1">
                                            <Link href="/profile" className="block px-4 py-2.5 text-sm hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200 transition-colors">
                                                My Profile
                                            </Link>
                                        </div>

                                        <div className="py-1 border-t border-gray-100 dark:border-zinc-800">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 font-medium transition-colors"
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
                            className="text-black dark:text-white p-2 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-800 focus:outline-none"
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
                <div className="md:hidden bg-[#EDEDED] dark:bg-[#121212] border-t border-gray-200 dark:border-gray-800 px-4 pt-2 pb-4 space-y-2 shadow-inner">
                    <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-800">Home</Link>
                    <Link href="/ideas" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-800">Ideas</Link>

                    {user && (
                        <>
                            <Link href="/my-ideas" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-800">My Ideas</Link>
                            <Link href="/interactions" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-800">My Interactions</Link>
                            <Link href="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-800">My Profile</Link>
                        </>
                    )}

                    {/* Theme Toggle Button (Always visible on Mobile Drawer) */}
                    {renderThemeToggle(true)}

                    {user ? (
                        <div className="grid grid-cols-2 gap-2 pt-2">
                            <Link href="/add-idea" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-black dark:bg-white dark:text-black text-center font-semibold">+ Add Idea</Link>
                            <button onClick={handleLogout} className="w-full text-center block px-3 py-2 rounded-md text-base font-medium bg-red-500 text-white hover:bg-red-600">Log out</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-2 pt-2">
                            <Link href="/login" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-black dark:bg-white dark:text-black text-center">Login</Link>
                            <Link href="/register" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-black dark:bg-white dark:text-black text-center">Register</Link>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;