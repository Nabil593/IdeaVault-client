import React from 'react';
import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#EDEDED] text-gray-800 border-t border-gray-200 font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

                    {/* Brand Section */}
                    <div className="md:col-span-1">
                        <Link href="/" className="text-xl font-bold tracking-tight text-black">
                            IdeaVault<span className="text-black">.</span>
                        </Link>
                        <p className="mt-3 text-sm text-gray-600 max-w-xs leading-relaxed">
                            A secure minimalist space to secure, share, and track your creative milestones.
                        </p>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-4">
                            Platform
                        </h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/ideas" className="text-gray-600 hover:text-black transition-colors">
                                    Browse Ideas
                                </Link>
                            </li>
                            <li>
                                <Link href="/categories" className="text-gray-600 hover:text-black transition-colors">
                                    Categories
                                </Link>
                            </li>
                            <li>
                                <Link href="/trending" className="text-gray-600 hover:text-black transition-colors">
                                    Trending
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-4">
                            Contact Info
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li>
                                <span className="font-medium text-gray-900">Email:</span> support@ideavault.com
                            </li>
                            <li>
                                <span className="font-medium text-gray-900">Location:</span> Remote / Global
                            </li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="text-xs font-bold text-black uppercase tracking-wider mb-4">
                            Connect With Us
                        </h3>
                        <div className="flex space-x-4">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors" aria-label="GitHub">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.008.069-.008 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors" aria-label="LinkedIn">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                </svg>
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black transition-colors" aria-label="Twitter">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Copyright Section */}
                <div className="mt-12 pt-6 border-t border-gray-300 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 gap-4">
                    <div>
                        &copy; {currentYear} IdeaVault. All rights reserved.
                    </div>
                    <div className="flex space-x-6">
                        <Link href="/privacy" className="hover:text-black transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-black transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;