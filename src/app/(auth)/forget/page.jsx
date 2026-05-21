"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ForgetPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        router.push('/login');
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-white dark:bg-[#121212] px-4 font-sans transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-xl p-8 transition-all">

                {/* Header Section */}
                <div className="text-center mb-8">
                    <h2 className="text-xl font-semibold mt-4 text-gray-900 dark:text-gray-100">
                        Reset Password
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Enter your email address and {"we'll"} send you a link to reset your password.
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

                    <button
                        type="submit"
                        className="w-full py-3 px-4 mt-2 text-sm font-medium rounded-lg bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white transition-all font-semibold"
                    >
                        Send Reset Link
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-zinc-800 text-center text-sm text-gray-600 dark:text-gray-400">
                    Remember your password?{' '}
                    <Link href="/login" className="font-medium text-black dark:text-white hover:underline transition-all">
                        Back to Login
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default ForgetPage;