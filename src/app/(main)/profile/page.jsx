"use client"

import React, { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { User, Mail, ShieldAlert, Save, Camera } from 'lucide-react';

const MyProfile = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const currentUser = session?.user;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        image: ''
    });


    useEffect(() => {
        if (currentUser) {
            setFormData({
                name: currentUser.name || '',
                image: currentUser.image || ''
            });
        }
    }, [currentUser]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/update-profile`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: currentUser?.email,
                    name: formData.name,
                    image: formData.image
                })
            });

            if (res.ok) {
                toast.success('Profile core synchronized!', {
                    description: 'Please reload the page or re-sync session to view client state changes.'
                });

                authClient.reloadSession(); 
            } else {
                toast.error('Failed to patch profile metrics.');
            }
        } catch (error) {
            console.error("Profile Submit Error:", error);
            toast.error('Network failure during profile synchronization.');
        } finally {
            setLoading(false);
        }
    };

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#121212]">
                <span className="loading loading-spinner loading-md text-zinc-400"></span>
            </div>
        );
    }

    if (!isPending && !currentUser) {
        router.push('/');
        return null;
    }


    const inputClasses = "w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:border-zinc-400 dark:focus:border-zinc-600 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none transition-all duration-300 pl-11";
    const labelClasses = "text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-semibold";

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-white dark:bg-[#121212] flex items-center justify-center px-4 py-12 font-sans transition-colors duration-300">
            <div className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl p-6 sm:p-10 relative overflow-hidden">

                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-zinc-400 dark:via-zinc-700 to-transparent" />

                {/* Header Section */}
                <div className="flex flex-col items-center text-center space-y-4 border-b border-zinc-100 dark:border-zinc-800 pb-8 mb-8">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-full border-2 border-zinc-200 dark:border-zinc-800 overflow-hidden bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center shadow-inner transition-all duration-300 group-hover:border-zinc-400 dark:group-hover:border-zinc-600">
                            {formData.image ? (
                                <img src={formData.image} alt="User Avatar" className="w-full h-full object-cover" onError={(e) => { e.target.src = "" }} />
                            ) : (
                                <User className="w-10 h-10 text-zinc-300 dark:text-zinc-700" />
                            )}
                        </div>
                        <div className="absolute bottom-0 right-0 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 p-1.5 rounded-full border border-white dark:border-zinc-900 shadow-md">
                            <Camera className="w-3.5 h-3.5" />
                        </div>
                    </div>

                    <div>
                        <h1 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                            {currentUser.name || 'Anonymous Innovator'}
                        </h1>
                        <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 flex items-center justify-center gap-1.5 mt-1">
                            <Mail className="w-3 h-3" /> {currentUser.email}
                        </p>
                    </div>
                </div>

                <form onSubmit={handleProfileUpdate} className="space-y-6">

                    {/* Email input */}
                    <div className="flex flex-col gap-2 opacity-60 cursor-not-allowed">
                        <label className={labelClasses}>Account Identity (Immutable)</label>
                        <div className="relative">
                            <Mail className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                                type="email"
                                disabled
                                value={currentUser.email}
                                className={`${inputClasses} bg-zinc-100 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-900 cursor-not-allowed`}
                            />
                        </div>
                    </div>

                    {/* Name input */}
                    <div className="flex flex-col gap-2">
                        <label className={labelClasses}>Full Name</label>
                        <div className="relative">
                            <User className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Update your identity name"
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    {/* Image URL input */}
                    <div className="flex flex-col gap-2">
                        <label className={labelClasses}>Avatar Image URL</label>
                        <div className="relative">
                            <Camera className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://images.unsplash.com/your-profile-path"
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-100 dark:text-zinc-950 disabled:bg-zinc-200 dark:disabled:bg-zinc-800 disabled:text-zinc-400 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Saving Data...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Save className="w-4 h-4" /> Save Profile Data
                                </span>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default MyProfile;