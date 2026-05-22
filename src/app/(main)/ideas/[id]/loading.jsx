import React from 'react';

const Loading = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-black transition-colors duration-300">
            <div className="flex items-center space-x-2">
                <span className="sr-only">Loading...</span>
                <div className="h-3 w-3 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="h-3 w-3 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="h-3 w-3 bg-indigo-600 dark:bg-indigo-400 rounded-full animate-bounce"></div>
            </div>
        </div>
    );
};

export default Loading;