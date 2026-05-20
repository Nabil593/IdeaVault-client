import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Users, DollarSign, Search, Calendar, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import { FilterPanel } from '@/app/Components/shared/FilterPanel';

// মেইন সার্ভার কম্পোনেন্ট 
const AllIdeasPage = async ({ searchParams }) => {
    // 🌟 সমাধান: মেইন ফাংশনের শুরুতেই searchParams-কে await করে একটা প্লেইন অবজেক্টে নিয়ে আসা হলো
    const resolvedParams = await searchParams;

    // এখন আর সরাসরি searchParams ব্যবহার না করে resolvedParams ব্যবহার করা হচ্ছে
    const search = resolvedParams?.search || '';
    const category = resolvedParams?.category || 'All';
    const startDate = resolvedParams?.startDate || '';
    const endDate = resolvedParams?.endDate || '';

    let ideas = [];

    try {
        // ১. URL Query Parameters তৈরি করা
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category && category !== 'All') params.append('category', category);
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        // ২. ফিল্টার কোয়েরি সহ ব্যাকএন্ডে রিকোয়েস্ট পাঠানো
        const res = await fetch(`http://localhost:5000/ideas?${params.toString()}`, {
            cache: 'no-store'
        });

        if (res.ok) {
            ideas = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch ideas:", error);
    }

    // ফিল্টার একটিভ আছে কিনা তা চেক করার শর্টহ্যান্ড কন্ডিশন (লাইন ১৩৭ এর সমাধান)
    const hasActiveFilters = search || (category && category !== 'All') || startDate || endDate;

    return (
        <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100  py-12 font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                {/* হেডার সেকশন */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100 dark:border-zinc-800 pb-6 gap-4">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-extrabold tracking-tight">
                            The Idea Vault
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-zinc-400">
                            Explore decentralized startup concepts and technical blueprints compiled by innovators.
                        </p>
                    </div>
                </div>

                {/* ৩. ফিল্টার প্যানেল সংযোজন */}
                <FilterPanel searchParams={searchParams} />

                {/* রেজাল্ট কাউন্টার বা ক্লিয়ার ফিল্টার অপশন (লাইন ১৩৭ এর ফিক্স) */}
                {hasActiveFilters && (
                    <div className="flex items-center justify-between text-xs text-gray-400 dark:text-zinc-500">
                        <span>Found {ideas.length} matching concept(s)</span>
                        <Link href="/ideas" className="text-zinc-900 dark:text-white underline hover:opacity-80">
                            Reset Filters
                        </Link>
                    </div>
                )}

                {/* যদি কোনো আইডিয়া না থাকে */}
                {ideas.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-gray-200 dark:border-zinc-800 rounded-md">
                        <p className="text-gray-400 dark:text-zinc-500 text-sm">No concepts matches your filters.</p>
                    </div>
                ) : (
                    /* ৩-কলাম গ্রিড লেআউট */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ideas.map((idea) => (
                            <div
                                key={idea._id}
                                className="group relative flex flex-col justify-between bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md p-6 shadow-sm hover:shadow-xl hover:border-gray-300 dark:hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1"
                            >

                                {/* 🌟 এখানে ইমেজটি যুক্ত করুন */}
                                {/* <div className="relative h-48 w-full bg-gray-100 dark:bg-zinc-800 overflow-hidden">
                                    <Image
                                        src={idea.imageUrl || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600"}
                                        alt={idea.title}
                                        fill
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div> */}

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 border border-gray-200/50 dark:border-zinc-700/50">
                                            {idea.category}
                                        </span>

                                        {idea.budget && (
                                            <span className="flex items-center text-sm text-gray-400 dark:text-zinc-500">
                                                {idea.budget}
                                            </span>
                                        )}
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors duration-200">
                                        {idea.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                                        {idea.shortDesc}
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-zinc-800/60 flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-1.5 max-w-[60%]">
                                        <Users className="w-3.5 h-3.5 text-gray-400 dark:text-zinc-500 flex-shrink-0" />
                                        <span className="text-xs text-gray-400 dark:text-zinc-500 truncate font-medium">
                                            {idea.targetAudience}
                                        </span>
                                    </div>

                                    <Link
                                        href={`/ideas/${idea._id}`}
                                        className="inline-flex items-center gap-1 text-xs font-bold text-zinc-900 dark:text-white hover:underline transition-all group/btn"
                                    >
                                        View Details
                                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllIdeasPage;