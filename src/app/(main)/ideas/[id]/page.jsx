"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, Users, Tag, Layers, MessageSquare, Trash2, Edit2, X, Check } from 'lucide-react';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';

const IdeaDetailsPage = () => {
    const { id } = useParams();
    const router = useRouter();

    const [idea, setIdea] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingText, setEditingText] = useState('');

    const { data: session } = authClient.useSession();
    const userDetails = session?.user;


    const currentUser = {
        name: userDetails?.name,
        email: userDetails?.email,
    };



    // 1. Loading idea & comment data from backend
    useEffect(() => {
        const fetchIdeaDetails = async () => {
            try {
                const res = await fetch(`http://localhost:5000/ideas/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setIdea(data);
                    if (data.comments) {
                        setComments(data.comments);
                    }
                } else {
                    toast.error("Failed to load concept details.");
                }
            } catch (error) {
                console.error("Error fetching idea:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchIdeaDetails();
    }, [id]);

    // 2. Add new comment
    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const commentPayload = {
            userName: currentUser.name,
            userEmail: currentUser.email,
            text: newComment
        };

        try {
            const res = await fetch(`http://localhost:5000/ideas/${id}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commentPayload)
            });

            const data = await res.json();

            if (data.success) {
                setComments([...comments, data.comment]);
                setNewComment('');
                toast.success("Comment permanently saved to database!");
            } else {
                toast.error(data.message || "Failed to save comment.");
            }
        } catch (error) {
            console.error("Error saving comment:", error);
            toast.error("Network error! Could not reach database.");
        }
    };

    // 3. Comment edit
    const startEdit = (comment) => {
        setEditingCommentId(comment._id);
        setEditingText(comment.text);
    };

    // 4. Save edited comments
    const handleSaveEdit = async (commentId) => {
        if (!editingText.trim()) return;

        try {
            const res = await fetch(`http://localhost:5000/ideas/${id}/comments/${commentId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: editingText })
            });

            const data = await res.json();

            if (data.success) {
                setComments(comments.map(c =>
                    c._id === commentId ? { ...c, text: editingText, timestamp: new Date().toISOString() } : c
                ));
                setEditingCommentId(null);
                setEditingText('');
                toast.success("Comment updated in database!");
            } else {
                toast.error("Failed to update comment.");
            }
        } catch (error) {
            toast.error("Network sync failed.");
        }
    };

    // 5. Delete comments
    const handleDeleteComment = async (commentId) => {
        try {
            const res = await fetch(`http://localhost:5000/ideas/${id}/comments/${commentId}`, {
                method: 'DELETE'
            });

            const data = await res.json();

            if (data.success) {
                setComments(comments.filter(c => c._id !== commentId));
                toast.success("Comment deleted from database.");
            } else {
                toast.error("Failed to delete comment.");
            }
        } catch (error) {
            toast.error("Network sync failed.");
        }
    };




    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#121212]">
                <span className="loading loading-spinner loading-md text-gray-400"></span>
            </div>
        );
    }

    if (!idea) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100">
                <p className="text-sm text-gray-400 mb-4">Concept not found or has been archived.</p>
                <Link href="/ideas" className="text-xs font-bold underline">Back to Vault</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 py-12 font-sans transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                {/* Back link */}
                <Link
                    href="/ideas"
                    className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-zinc-500 hover:text-gray-900 dark:hover:text-white transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
                    Back to Vault
                </Link>

                {/* Main card */}
                <div className="border border-gray-200 dark:border-zinc-800 rounded-md p-6 sm:p-10 space-y-8 bg-white dark:bg-zinc-900/40 shadow-sm">

                    {idea.imageUrl && (
                        <div className="relative h-80 w-full bg-gray-100 dark:bg-zinc-800 overflow-hidden rounded-md border-b border-gray-100 dark:border-zinc-800/50 ">
                            <Image
                                src={idea.imageUrl}
                                alt={idea.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                priority={false}
                            />
                        </div>
                    )}

                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 border border-gray-200/50 dark:border-zinc-700/50">
                            <Tag className="w-3 h-3" />
                            {idea.category}
                        </span>

                        {idea.budget && (
                            <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                                Budget: {idea.budget}
                            </span>
                        )}
                    </div>

                    <div className="space-y-3">
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            {idea.title}
                        </h1>
                        <p className="text-base text-gray-500 dark:text-zinc-400 leading-relaxed">
                            {idea.shortDesc}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-b border-gray-100 dark:border-zinc-800/60 py-6">
                        <div className="flex items-center gap-3">
                            <Users className="w-4 h-4 text-gray-400 dark:text-zinc-500 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Target Audience</p>
                                <p className="text-xs font-medium truncate max-w-[280px]">{idea.targetAudience}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Layers className="w-4 h-4 text-gray-400 dark:text-zinc-500 flex-shrink-0" />
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 uppercase tracking-wider">Blueprint Status</p>
                                <p className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wide">Vetted Concept</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
                            Detailed Overview & Execution Plan
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-zinc-300 leading-relaxed whitespace-pre-wrap">
                            {idea.description || "No full-stack architecture details provided for this specific canvas. Please refer to the author's git workflow tags for deployment targets."}
                        </p>
                    </div>

                </div>

                {/* Comment Section */}
                <div className="space-y-6 pt-4">
                    <div className="flex items-center gap-2 border-b border-gray-100 dark:border-zinc-800 pb-3">
                        <MessageSquare className="w-4 h-4 text-gray-400" />
                        <h2 className="text-lg font-bold tracking-tight">Discussion ({comments.length})</h2>
                    </div>

                    <form onSubmit={handleAddComment} className="space-y-3">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a constructive feedback or ask about system architecture..."
                            rows={3}
                            className="w-full text-sm p-4 rounded-md border border-gray-200 dark:border-zinc-800 bg-white dark:bg-[#121212] focus:outline-none focus:border-gray-400 dark:focus:border-zinc-600 resize-none placeholder:text-gray-400 dark:placeholder:text-zinc-600 transition-colors"
                        />
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={!newComment.trim()}
                                className="px-4 py-2 text-xs font-bold bg-zinc-950 dark:bg-white text-white dark:text-black rounded-md hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                            >
                                Comment
                            </button>
                        </div>
                    </form>


                    <div className="space-y-4 mt-6">
                        {comments.length === 0 ? (
                            <p className="text-xs text-gray-400 dark:text-zinc-600 text-center py-6">No discussions yet. Be the first to analyze this concept.</p>
                        ) : (
                            comments.map((comment) => {
                                const isOwnComment = comment.userEmail === currentUser.email;
                                const isEditing = editingCommentId === comment._id;

                                return (
                                    <div
                                        key={comment._id}
                                        className="p-4 rounded-md border border-gray-100 dark:border-zinc-800/60 bg-zinc-50/30 dark:bg-zinc-900/20 space-y-2 relative group"
                                    >

                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-bold text-gray-900 dark:text-white">
                                                    {comment.userName}
                                                </span>
                                                {isOwnComment && (
                                                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-zinc-800 text-gray-400 uppercase tracking-wider">
                                                        You
                                                    </span>
                                                )}
                                                <span className="text-[10px] text-gray-400 dark:text-zinc-600 font-medium">
                                                    • {new Date(comment.timestamp).toLocaleDateString(undefined, { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>

                                            {/* Show Edit & delet button */}
                                            {isOwnComment && !isEditing && (
                                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => startEdit(comment)}
                                                        className="p-1 text-gray-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                                        title="Edit Comment"
                                                    >
                                                        <Edit2 className="w-3.5 h-3.5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteComment(comment._id)}
                                                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                                        title="Delete Comment"
                                                    >
                                                        <Trash2 className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {isEditing ? (
                                            <div className="space-y-2 pt-1">
                                                <input
                                                    type="text"
                                                    value={editingText}
                                                    onChange={(e) => setEditingText(e.target.value)}
                                                    className="w-full text-xs p-2 rounded border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none"
                                                />
                                                <div className="flex items-center gap-1.5 justify-end">
                                                    <button
                                                        onClick={() => setEditingCommentId(null)}
                                                        className="p-1.5 rounded bg-gray-100 dark:bg-zinc-800 text-gray-500 hover:bg-gray-200 text-xs flex items-center gap-1 font-medium"
                                                    >
                                                        <X className="w-3 h-3" /> Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => handleSaveEdit(comment._id)}
                                                        className="p-1.5 rounded bg-zinc-950 dark:bg-white text-white dark:text-black text-xs flex items-center gap-1 font-bold"
                                                    >
                                                        <Check className="w-3 h-3" /> Save
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className="text-xs sm:text-sm text-gray-600 dark:text-zinc-300 leading-relaxed break-words">
                                                {comment.text}
                                            </p>
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default IdeaDetailsPage;