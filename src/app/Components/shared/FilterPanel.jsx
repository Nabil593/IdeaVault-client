import { Calendar, Search, SlidersHorizontal } from "lucide-react";

export const FilterPanel = async ({ searchParams }) => {
    const resolvedSearchParams = await searchParams;

    return (
        <form method="GET" action="/ideas" className="bg-gray-50 dark:bg-zinc-900/50 border border-gray-200 dark:border-zinc-800/80 rounded-md p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end font-sans">

            {/* Search Input */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-zinc-500 flex items-center gap-1">
                    <Search className="w-3 h-3" /> Search Concept
                </label>
                <input
                    type="text"
                    name="search"
                    defaultValue={resolvedSearchParams?.search || ''}
                    placeholder="By idea title..."
                    className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition"
                />
            </div>

            {/* Category filter */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-zinc-500 flex items-center gap-1">
                    <SlidersHorizontal className="w-3 h-3" /> Category
                </label>
                <select
                    name="category"
                    defaultValue={resolvedSearchParams?.category || 'All'}
                    className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none cursor-pointer"
                >
                    <option value="All">All Categories</option>
                    <option value="Tech">Tech</option>
                    <option value="AI">AI</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                    <option value="Fintech">Fintech</option>
                    <option value="SaaS">SaaS</option>
                </select>
            </div>

            {/* Start date */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-zinc-500 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> From Date
                </label>
                <input
                    type="date"
                    name="startDate"
                    defaultValue={resolvedSearchParams?.startDate || ''}
                    className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none"
                />
            </div>

            {/* End Date */}
            <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-1 grid grid-cols-3 gap-2">
                <div className="col-span-2 flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-zinc-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> To Date
                    </label>
                    <input
                        type="date"
                        name="endDate"
                        defaultValue={resolvedSearchParams?.endDate || ''}
                        className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md px-3 py-2.5 text-sm text-gray-900 dark:text-gray-100 focus:outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-zinc-950 rounded-md font-bold text-xs uppercase tracking-wider h-[42px] mt-auto flex items-center justify-center shadow transition-all cursor-pointer"
                >
                    Apply
                </button>
            </div>
        </form>
    );
};