import React from 'react';
import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#EDEDED] dark:bg-[#121212] text-gray-800 dark:text-gray-200 border-t border-gray-200 dark:border-gray-800 font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <Link href="/" className="text-xl font-bold tracking-tight text-black dark:text-white">
                            IdeaVault<span className="text-black dark:text-white">.</span>
                        </Link>
                        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">
                            A secure minimalist space to secure, share, and track your creative milestones.
                        </p>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h3 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider mb-4">
                            Platform
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/ideas" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                    Browse Ideas
                                </Link>
                            </li>
                            <li>
                                <Link href="/ideas" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
                                    Trending
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider mb-4">
                            Contact Info
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                            <li>
                                <span className="font-medium text-gray-900 dark:text-gray-200">Email:</span> support@ideavault.com
                            </li>
                            <li>
                                <span className="font-medium text-gray-900 dark:text-gray-200">Location:</span> Remote / Global
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-xs font-bold text-black dark:text-white uppercase tracking-wider mb-4">
                            Connect With Us
                        </h3>
                        <div className="flex space-x-4">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" aria-label="LinkedIn">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors" aria-label="Twitter">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Section */}
                <div className="mt-12 pt-6 border-t border-gray-300 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 dark:text-gray-400 gap-4">
                    <div>
                        &copy; {currentYear} IdeaVault. All rights reserved.
                    </div>
                    <div className="flex space-x-6">
                        <Link href="/privacy" className="hover:text-black dark:hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-black dark:hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;