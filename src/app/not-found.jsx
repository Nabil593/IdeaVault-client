"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NotFound = () => {
    const router = useRouter();

    return (
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-white dark:bg-[#121212] px-4 font-sans transition-colors duration-300">
            <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm p-8 text-center transition-all">

                {/* Big 404 Text */}
                <h1 className="text-7xl font-extrabold tracking-widest text-black dark:text-white animate-pulse">
                    404
                </h1>

                {/* Error Message */}
                <h2 className="text-xl font-semibold mt-4 text-gray-900 dark:text-gray-100">
                    Page Not Found
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-8">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    {/* Go Back Button */}
                    <button
                        onClick={() => router.back()}
                        className="flex-1 py-2.5 px-4 text-sm font-medium rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-200 transition-all focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                    >
                        Go Back
                    </button>

                    {/* Take Me Home Button */}
                    <Link
                        href="/"
                        className="flex-1 py-2.5 px-4 text-sm font-semibold rounded-lg bg-black text-white dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white text-center transition-all"
                    >
                        Take Me Home
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default NotFound;