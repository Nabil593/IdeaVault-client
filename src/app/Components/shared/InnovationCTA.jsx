import React from 'react';
import Link from 'next/link';
import { Lightbulb, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const InnovationCTA = () => {
    return (
        <section className="py-12 bg-white dark:bg-[#121212] font-sans transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="relative overflow-hidden bg-gray-50 dark:bg-zinc-900/40 border border-gray-200 dark:border-zinc-800 rounded-md p-8 md:p-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 group">

                    <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-neutral-100 dark:bg-zinc-800/30 rounded-full blur-3xl pointer-events-none transition-colors duration-300"></div>

                    <div className="space-y-4 max-w-2xl relative z-10">
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-900 text-white dark:bg-white dark:text-black">
                                <Zap className="w-3 h-3 fill-current" /> Build Tomorrow
                            </span>
                        </div>

                        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
                            Have a disruptive technical framework or startup concept?
                        </h2>

                        <p className="text-sm text-gray-500 dark:text-zinc-400 leading-relaxed max-w-xl">
                            Deploy your structural blueprint to the IdeaVault ecosystem. Get peer validation, track key milestones, and securely attract international developer nodes or angel interactions.
                        </p>

                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-gray-400 dark:text-zinc-500 font-medium">
                            <span className="flex items-center gap-1.5">
                                <ShieldCheck className="w-4 h-4 text-zinc-900 dark:text-white" /> Permanent Time-stamping
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Lightbulb className="w-4 h-4 text-zinc-900 dark:text-white" /> Open Ecosystem Proof
                            </span>
                        </div>
                    </div>

                    <div className="relative z-10 w-full lg:w-auto flex-shrink-0">
                        <Link href="/add-idea" className="block w-full sm:inline-block">
                            <button className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 text-sm font-bold tracking-tight text-white bg-zinc-900 hover:bg-zinc-800 dark:text-black dark:bg-white dark:hover:bg-gray-100 border border-transparent rounded-md shadow-sm transition-all duration-200 group/btn">
                                Vault Your Concept
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                            </button>
                        </Link>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default InnovationCTA;