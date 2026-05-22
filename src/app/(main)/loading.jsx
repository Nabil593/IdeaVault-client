import { Spinner } from '@heroui/react';
import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-zinc-950 transition-colors duration-300">
            <div className="flex flex-col items-center gap-3">
                <Spinner size="xl" className="text-indigo-600 dark:text-indigo-400" />

                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium tracking-wide animate-pulse">
                    Loading...
                </span>
            </div>
        </div>
    );
};

export default Loading;