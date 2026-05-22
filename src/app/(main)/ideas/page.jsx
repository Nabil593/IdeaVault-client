import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Users, DollarSign, Search, Calendar, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import { FilterPanel } from '@/app/Components/shared/FilterPanel';


const AllIdeasPage = async ({ searchParams }) => {

    const resolvedParams = await searchParams;

    const search = resolvedParams?.search || '';
    const category = resolvedParams?.category || 'All';
    const startDate = resolvedParams?.startDate || '';
    const endDate = resolvedParams?.endDate || '';

    let ideas = [];

    try {
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category && category !== 'All') params.append('category', category);
        if (startDate) params.append('startDate', startDate);
        if (endDate) params.append('endDate', endDate);

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas?${params.toString()}`, {
            cache: 'no-store'
        });

        if (res.ok) {
            ideas = await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch ideas:", error);
    }

    const hasActiveFilters = search || (category && category !== 'All') || startDate || endDate;

    return (
        <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100  py-12 font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                {/* Header Section */}
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

                {/* FilterPannel Added */}
                <FilterPanel searchParams={searchParams} />

                {/* Result counter & Reset filter */}
                {hasActiveFilters && (
                    <div className="flex items-center justify-between text-xs text-gray-400 dark:text-zinc-500">
                        <span>Found {ideas.length} matching concept(s)</span>
                        <Link href="/ideas" className="text-zinc-900 dark:text-white underline hover:opacity-80">
                            Reset Filters
                        </Link>
                    </div>
                )}

                {ideas.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-gray-200 dark:border-zinc-800 rounded-md">
                        <p className="text-gray-400 dark:text-zinc-500 text-sm">No concepts matches your filters.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {ideas.map((idea) => (
                            <div
                                key={idea._id}
                                className="group relative flex flex-col justify-between bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md p-6 shadow-sm hover:shadow-xl hover:border-gray-300 dark:hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1"
                            >

                                {idea.imageUrl && (
                                    <div className="relative h-44 w-full bg-zinc-100 dark:bg-zinc-800/50 overflow-hidden rounded-t-md border-b border-gray-100 dark:border-zinc-800/60 group">
                                        <Image
                                            src={idea.imageUrl}
                                            alt={idea.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            loading="lazy"
                                            unoptimized={false}
                                        />
                                    </div>
                                )}

                                <div className="space-y-4 mt-4">
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