"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useSession } from "@/lib/auth-client";

export const metadata = {
  title: "Idea Vault - add-idea",
};

const AddIdeaPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const { data: session } = useSession();
    const currentUser = session?.user;

    const [formData, setFormData] = useState({
        title: '',
        shortDesc: '',
        detailedDesc: '',
        category: 'Tech',
        tags: '',
        imageUrl: '',
        budget: '',
        targetAudience: '',
        problemStatement: '',
        proposedSolution: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!currentUser?.email) {
            toast.error('You must be logged in to deploy a concept!');
            setLoading(false);
            return;
        }

        const ideaPayload = {
            ...formData,
            userEmail: currentUser.email
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ideaPayload)
            });

            if (response.ok) {
                toast.success('Your brilliant idea has been secured!', {
                    style: {
                        background: 'var(--toast-bg, #111)',
                        color: 'var(--toast-color, #fff)',
                    }
                });

                setTimeout(() => {
                    router.push('/ideas');
                }, 2000);
            } else {
                toast.error('Failed to save your idea. Try again.');
            }
        } catch (error) {
            console.error("Submission Error:", error);
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };


    const inputClasses = "w-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 focus:border-gray-400 dark:focus:border-zinc-600 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-zinc-600 focus:outline-none transition-all duration-300";
    const labelClasses = "text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-zinc-400";

    return (
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-white dark:bg-[#121212] px-4 py-12 font-sans transition-colors duration-300">
            <div className="w-full max-w-3xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-xl p-6 sm:p-10 transition-all">

                {/* Header Section */}
                <div className="space-y-2 border-b border-gray-100 dark:border-zinc-800 pb-6 mb-6">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Deploy Your New Idea
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                        Secure your intellectual breakthroughs and compile them into high-fidelity logs.
                    </p>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Idea Title */}
                    <div className="flex flex-col gap-2">
                        <label className={labelClasses}>Idea Title *</label>
                        <input
                            type="text" name="title" required value={formData.title} onChange={handleChange}
                            placeholder="e.g., Decentralized Code Vault for Innovators"
                            className={inputClasses}
                        />
                    </div>

                    {/* Short Description */}
                    <div className="flex flex-col gap-2">
                        <label className={labelClasses}>Short Description *</label>
                        <input
                            type="text" name="shortDesc" required value={formData.shortDesc} onChange={handleChange}
                            placeholder="A brief one-liner summarizing the core innovation"
                            className={inputClasses}
                        />
                    </div>

                    {/* Grid Layout for Category, Budget, and Tags */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Category Dropdown */}
                        <div className="flex flex-col gap-2">
                            <label className={labelClasses}>Category *</label>
                            <select
                                name="category" value={formData.category} onChange={handleChange}
                                className={`${inputClasses} cursor-pointer appearance-none`}
                            >
                                <option value="Tech">Tech</option>
                                <option value="AI">AI / ML</option>
                                <option value="Health">HealthTech</option>
                                <option value="Education">EdTech</option>
                                <option value="Fintech">Fintech</option>
                                <option value="SaaS">SaaS</option>
                            </select>
                        </div>

                        {/* Estimated Budget */}
                        <div className="flex flex-col gap-2">
                            <label className={labelClasses}>Estimated Budget (Optional)</label>
                            <input
                                type="text" name="budget" value={formData.budget} onChange={handleChange}
                                placeholder="e.g., $5,000"
                                className={inputClasses}
                            />
                        </div>

                        {/* Tags */}
                        <div className="flex flex-col gap-2">
                            <label className={labelClasses}>Tags (Optional)</label>
                            <input
                                type="text" name="tags" value={formData.tags} onChange={handleChange}
                                placeholder="e.g., nextjs, web3, stealth"
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    {/* Image URL & Target Audience Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className={labelClasses}>Image URL</label>
                            <input
                                type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange}
                                placeholder="https://unsplash.com/..."
                                className={inputClasses}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className={labelClasses}>Target Audience *</label>
                            <input
                                type="text" name="targetAudience" required value={formData.targetAudience} onChange={handleChange}
                                placeholder="e.g., Indie Hackers, Full-stack devs"
                                className={inputClasses}
                            />
                        </div>
                    </div>

                    {/* Problem Statement */}
                    <div className="flex flex-col gap-2">
                        <label className={labelClasses}>Problem Statement *</label>
                        <textarea
                            name="problemStatement" required rows={3} value={formData.problemStatement} onChange={handleChange}
                            placeholder="What painful friction or bottleneck are you addressing?"
                            className={`${inputClasses} resize-none`}
                        />
                    </div>

                    {/* Proposed Solution */}
                    <div className="flex flex-col gap-2">
                        <label className={labelClasses}>Proposed Solution *</label>
                        <textarea
                            name="proposedSolution" required rows={3} value={formData.proposedSolution} onChange={handleChange}
                            placeholder="How does your engineering solve this problem flawlessly?"
                            className={`${inputClasses} resize-none`}
                        />
                    </div>

                    {/* Detailed Description */}
                    <div className="flex flex-col gap-2">
                        <label className={labelClasses}>Detailed Description *</label>
                        <textarea
                            name="detailedDesc" required rows={5} value={formData.detailedDesc} onChange={handleChange}
                            placeholder="Break down the roadmap, features, and tech stack details..."
                            className={`${inputClasses} resize-none`}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-zinc-950 disabled:bg-gray-300 dark:disabled:bg-zinc-800 disabled:text-gray-500 px-6 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 shadow-lg cursor-pointer flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Securing Concept...
                                </span>
                            ) : (
                                "Submit Startup Concept"
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddIdeaPage;