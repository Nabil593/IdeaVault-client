"use client"

import React, { useState, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { MessageSquare, ArrowUpRight, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const InteractionsPage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const currentUser = session?.user;

    const [commentedIdeas, setCommentedIdeas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInteractions = async () => {
            if (!currentUser?.email) return;
            try {
                setLoading(true);
                const res = await fetch(`http://localhost:5000/my-interactions?email=${currentUser.email}`);
                if (res.ok) {
                    const data = await res.json();
                    setCommentedIdeas(data);
                } else {
                    toast.error("Failed to sync your interactive logs.");
                }
            } catch (error) {
                console.error("Interactions Fetch Error:", error);
                toast.error("Network error! Could not load interactions.");
            } finally {
                setLoading(false);
            }
        };

        if (!isPending) {
            if (currentUser?.email) {
                fetchInteractions();
            } else {
                router.push('/');
            }
        }
    }, [currentUser?.email, isPending]);


    if (isPending || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#121212]">
                <span className="loading loading-spinner loading-md text-zinc-400"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#121212] text-zinc-900 dark:text-zinc-100 py-12 font-sans transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                {/* Header Section */}
                <div className="border-b border-zinc-100 dark:border-zinc-800 pb-5 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-extrabold tracking-tight">My Interactions</h1>
                        <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                            Private dashboard compiling your collaborative footprints and conceptual feedback.
                        </p>
                    </div>
                </div>

                {/* Content list */}
                {commentedIdeas.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/30 dark:bg-zinc-900/10">
                        <MessageSquare className="w-8 h-8 text-zinc-300 dark:text-zinc-700 mx-auto mb-3" />
                        <p className="text-sm text-zinc-400 font-medium">No system commentary logged yet.</p>
                        <p className="text-xs text-zinc-500 mt-1">Ideas you comment on will automatically map to this vault.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                            <MessageSquare className="w-3.5 h-3.5" /> Commented Startup Concepts ({commentedIdeas.length})
                        </h2>

                        <div className="grid grid-cols-1 gap-4">
                            {commentedIdeas.map((idea) => {
                                const myLastComment = idea.comments
                                    ?.filter(c => c.userEmail === currentUser.email)
                                    .pop();

                                return (
                                    <div
                                        key={idea._id}
                                        className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 bg-white dark:bg-zinc-900/20 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                                    >
                                        <div className="space-y-2 max-w-3xl">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                                    {idea.category}
                                                </span>
                                                <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {myLastComment ? new Date(myLastComment.timestamp).toLocaleDateString() : 'Recent'}
                                                </span>
                                            </div>

                                            <h3 className="text-base font-bold tracking-tight text-zinc-900 dark:text-white">
                                                {idea.title}
                                            </h3>

                                            {/* Comment preview box */}
                                            {myLastComment && (
                                                <div className="mt-2 text-xs border-l-2 border-zinc-300 dark:border-zinc-700 pl-3 py-1 text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/50 rounded-r-md italic">
                                                    {myLastComment.text} 
                                                </div>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => router.push(`/ideas/${idea._id}`)}
                                            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 transition-all self-start md:self-center"
                                        >
                                            View Concept <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default InteractionsPage;