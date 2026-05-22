import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/60 dark:bg-zinc-950/60 backdrop-blur-md transition-colors duration-300">
            <div className="flex flex-col items-center gap-4">
                {/* Tailwind v4 & DaisyUI optimized custom pulse spinner */}
                <div className="relative flex h-16 w-16 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-500/30 opacity-75"></span>
                    <span className="loading loading-spinner loading-lg text-indigo-600 dark:text-indigo-400"></span>
                </div>
                <p className="text-sm font-medium tracking-wide text-zinc-600 dark:text-zinc-300 animate-pulse">
                    Loading Vault...
                </p>
            </div>
        </div>
    );
};

export default Loading;