"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

const LoginPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Redirect target (Protected route থেকে আসলে সেখানে ফেরত পাঠাবে, নয়তো হোমপেজে)
    const redirectTo = searchParams.get('redirect') || '/';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data, error } = await authClient.signIn.email({
                email: email, // required
                password: password, // required
                rememberMe: true,
                // callbackURL: "https://example.com/callback",
            });

            if (!error) {
                toast.success("Successfully Logged In!");
                router.push(redirectTo);
                // console.log(data);
            } else {
                toast.error(error.message || "Failed to log in. Please check credentials.");
            }

        } catch (error) {
            toast.error(error.message || "Something went wrong. Please try again.");
            // console.error(error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            const { data, error } = await authClient.signIn.social({
                provider: "google",
            });

            if (!error) {
                toast.success("Logged in with Google!");
                router.push('/');
                // console.log("Google Login Clicked", data);
            } else {
                toast.error(error.message || "Failed to log in with Google.");
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong. Please try again.");
            // console.error(error);
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-white dark:bg-[#121212] px-4 font-sans transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-xl p-8 transition-all">

                {/* Header Section */}
                <div className="text-center mb-8">
                    <h2 className="text-xl font-semibold mt-4 text-gray-900 dark:text-gray-100">
                        Welcome Back
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Log in to secure and track your creative milestones.
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Email Input */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent text-sm transition-all"
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                Password
                            </label>
                            {/* Forget Password (UI only) */}
                            <button
                                type="button"
                                className="text-xs text-gray-500 hover:text-black dark:hover:text-white transition-colors"
                            >
                                <Link href={'/forget'}>Forgot?</Link>
                            </button>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 pr-12 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent text-sm transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                            >
                                {showPassword ? (
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-3 px-4 mt-2 text-sm font-medium rounded-lg bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-all font-semibold"
                    >
                        Sign In
                    </button>
                </form>

                {/* --- OR Divider --- */}
                <div className="relative flex py-5 items-center">
                    <div className="flex-grow border-t border-gray-200 dark:border-zinc-800"></div>
                    <span className="flex-shrink mx-4 text-xs text-gray-400 uppercase tracking-wider font-medium">Or continue with</span>
                    <div className="flex-grow border-t border-gray-200 dark:border-zinc-800"></div>
                </div>

                {/* Google Login Only */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent hover:bg-gray-50 dark:hover:bg-zinc-800 text-sm font-medium text-gray-700 dark:text-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                    <span>Sign in with Google</span>
                </button>

                {/* Link to Register */}
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800 text-center text-sm text-gray-600 dark:text-gray-400">
                    {"Don't"} have an account?{' '}
                    <Link href="/register" className="font-medium text-black dark:text-white hover:underline transition-all">
                        Register here
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;