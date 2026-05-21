import React from 'react';
import { Lightbulb, Users, ShieldCheck, Milestone } from 'lucide-react';

const PlatformStats = () => {
    const stats = [
        { id: 1, name: 'Total Ideas Vaulted', value: '1,420+', icon: Lightbulb },
        { id: 2, name: 'Active Innovators', value: '3,800+', icon: Users },
        { id: 3, name: 'Concepts Validated', value: '94%', icon: ShieldCheck },
        { id: 4, name: 'Milestones Tracked', value: '12K+', icon: Milestone },
    ];

    return (
        <section className="py-16 bg-gray-50 dark:bg-zinc-900/40 border-y border-gray-100 dark:border-zinc-800/60 font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Grid Layout */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.id} className="flex flex-col items-center text-center p-4 space-y-2 group">
                                <div className="p-3 bg-white dark:bg-zinc-900 border border-gray-200/60 dark:border-zinc-800 rounded-xl shadow-sm group-hover:scale-105 transition-transform duration-300">
                                    <Icon className="w-6 h-6 text-zinc-900 dark:text-white" />
                                </div>
                                <span className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white pt-2">
                                    {stat.value}
                                </span>
                                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-zinc-400">
                                    {stat.name}
                                </span>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default PlatformStats;