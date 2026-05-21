"use client"

import React, { useState, useEffect } from 'react';
import { Edit2, Trash2, X, Check, AlertTriangle, Layers, Tag } from 'lucide-react';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

const MyIdeasPage = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const currentUser = session?.user;

    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isUpdateOpen, setIsUpdateOpen] = useState(false);
    const [selectedIdea, setSelectedIdea] = useState(null);
    const [updateForm, setUpdateForm] = useState({ title: '', shortDesc: '', category: '', budget: '', targetAudience: '', description: '' });

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [ideaIdToDelete, setIdeaIdToDelete] = useState(null);

    // 1. Only logged-in user ideas are fetched from backend
    useEffect(() => {
        const fetchMyIdeas = async () => {
            if (!currentUser?.email) return;
            try {
                const res = await fetch(`http://localhost:5000/my-ideas?email=${currentUser.email}`);
                if (res.ok) {
                    const data = await res.json();
                    setIdeas(data);
                } else {
                    toast.error("Failed to load your personal vault.");
                }
            } catch (error) {
                console.error("Error loading ideas:", error);
            } finally {
                setLoading(false);
            }
        };

        if (!isPending) {
            if (currentUser?.email) {
                fetchMyIdeas();
            } else {
                router.push('/');
            }
        }
    }, [currentUser?.email, isPending]);

    // 2.Update modal
    const openUpdateModal = (idea) => {
        setSelectedIdea(idea);
        setUpdateForm({
            title: idea.title,
            shortDesc: idea.shortDesc,
            category: idea.category,
            budget: idea.budget || '',
            targetAudience: idea.targetAudience || '',
            description: idea.description || ''
        });
        setIsUpdateOpen(true);
    };

    // 3. Submitting updates to the backend
    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:5000/ideas/${selectedIdea._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateForm)
            });
            const data = await res.json();

            if (data.success || res.ok) {
                setIdeas(ideas.map(id => id._id === selectedIdea._id ? { ...id, ...updateForm } : id));
                setIsUpdateOpen(false);
                toast.success("Idea architecture updated successfully!");
            } else {
                toast.error("Failed to update blueprint.");
            }
        } catch (error) {
            toast.error("Sync failed during update.");
        }
    };

    // 4. Delet Modal
    const openDeleteModal = (id) => {
        setIdeaIdToDelete(id);
        setIsDeleteOpen(true);
    };

    // 5. Final Delete 
    const handleDeleteConfirm = async () => {
        try {
            const res = await fetch(`http://localhost:5000/ideas/${ideaIdToDelete}`, {
                method: 'DELETE'
            });
            const data = await res.json();

            if (data.success || res.ok) {
                setIdeas(ideas.filter(id => id._id !== ideaIdToDelete));
                setIsDeleteOpen(false);
                toast.success("Idea permanently purged from database.");
            } else {
                toast.error("Failed to delete the canvas.");
            }
        } catch (error) {
            toast.error("Network sync error during deletion.");
        }
    };

    if (isPending || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#121212]">
                <span className="loading loading-spinner loading-md text-gray-400"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-[#121212] text-gray-900 dark:text-gray-100 py-12 font-sans transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                {/* Header Section */}
                <div className="border-b border-gray-100 dark:border-zinc-800 pb-5">
                    <h1 className="text-2xl font-extrabold tracking-tight">My Personal Vault</h1>
                    <p className="text-xs text-gray-400 dark:text-zinc-500 mt-1">Manage and optimize your curated full-stack system architectures.</p>
                </div>

                {ideas.length === 0 ? (
                    <div className="text-center py-16 border border-dashed border-gray-200 dark:border-zinc-800 rounded-md">
                        <p className="text-sm text-gray-400 mb-2">You {"haven't"} safely deployed any ideas yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {ideas.map((idea) => (
                            <div key={idea._id} className="border border-gray-200 dark:border-zinc-800 rounded-md p-6 bg-white dark:bg-zinc-900/30 flex flex-col justify-between transition-all hover:border-gray-300 dark:hover:border-zinc-700 shadow-sm relative group">
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-gray-100 dark:bg-zinc-800 text-gray-500 dark:text-zinc-400">
                                            <Tag className="w-2.5 h-2.5" /> {idea.category}
                                        </span>

                                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => openUpdateModal(idea)} className="p-1 text-gray-400 hover:text-zinc-900 dark:hover:text-white transition-colors" title="Edit Architecture">
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={() => openDeleteModal(idea._id)} className="p-1 text-gray-400 hover:text-red-500 transition-colors" title="Purge Concept">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </div>

                                    <h2 className="text-base font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">{idea.title}</h2>
                                    <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed line-clamp-2">{idea.shortDesc}</p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-zinc-800/60 flex items-center justify-between text-[10px] text-gray-400 font-medium">
                                    <span className="truncate max-w-[150px]">Audience: {idea.targetAudience || 'N/A'}</span>
                                    <span className="font-bold text-zinc-700 dark:text-zinc-300">{idea.budget ? `Budget: ${idea.budget}` : 'No Budget Specified'}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/*  Update Modal */}
                {isUpdateOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md max-w-lg w-full p-6 space-y-4 shadow-xl max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 pb-2">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500">Edit Concept Blueprint</h3>
                                <button onClick={() => setIsUpdateOpen(false)} className="text-gray-400 hover:text-gray-900 dark:hover:text-white"><X className="w-4 h-4" /></button>
                            </div>

                            <form onSubmit={handleUpdateSubmit} className="space-y-4 text-xs">
                                <div className="space-y-1">
                                    <label className="font-bold text-gray-400 uppercase tracking-wide">Concept Title</label>
                                    <input type="text" required value={updateForm.title} onChange={e => setUpdateForm({ ...updateForm, title: e.target.value })} className="w-full p-2.5 rounded border border-gray-200 dark:border-zinc-800 bg-transparent focus:outline-none focus:border-gray-400 dark:focus:border-zinc-600" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-gray-400 uppercase tracking-wide">Short Tagline</label>
                                    <input type="text" required value={updateForm.shortDesc} onChange={e => setUpdateForm({ ...updateForm, shortDesc: e.target.value })} className="w-full p-2.5 rounded border border-gray-200 dark:border-zinc-800 bg-transparent focus:outline-none focus:border-gray-400 dark:focus:border-zinc-600" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="font-bold text-gray-400 uppercase tracking-wide">Category</label>
                                        <input type="text" required value={updateForm.category} onChange={e => setUpdateForm({ ...updateForm, category: e.target.value })} className="w-full p-2.5 rounded border border-gray-200 dark:border-zinc-800 bg-transparent focus:outline-none focus:border-gray-400 dark:focus:border-zinc-600" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="font-bold text-gray-400 uppercase tracking-wide">Budget Cap</label>
                                        <input type="text" value={updateForm.budget} onChange={e => setUpdateForm({ ...updateForm, budget: e.target.value })} className="w-full p-2.5 rounded border border-gray-200 dark:border-zinc-800 bg-transparent focus:outline-none focus:border-gray-400 dark:focus:border-zinc-600" />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-gray-400 uppercase tracking-wide">Target Demographics</label>
                                    <input type="text" value={updateForm.targetAudience} onChange={e => setUpdateForm({ ...updateForm, targetAudience: e.target.value })} className="w-full p-2.5 rounded border border-gray-200 dark:border-zinc-800 bg-transparent focus:outline-none focus:border-gray-400 dark:focus:border-zinc-600" />
                                </div>
                                <div className="space-y-1">
                                    <label className="font-bold text-gray-400 uppercase tracking-wide">Execution & System Architecture Details</label>
                                    <textarea rows={4} value={updateForm.description} onChange={e => setUpdateForm({ ...updateForm, description: e.target.value })} className="w-full p-2.5 rounded border border-gray-200 dark:border-zinc-800 bg-transparent focus:outline-none focus:border-gray-400 dark:focus:border-zinc-600 resize-none" />
                                </div>

                                <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-zinc-800">
                                    <button type="button" onClick={() => setIsUpdateOpen(false)} className="px-4 py-2 font-medium rounded bg-gray-100 dark:bg-zinc-800 text-gray-500 hover:opacity-90">Cancel</button>
                                    <button type="submit" className="px-4 py-2 font-bold rounded bg-zinc-950 dark:bg-white text-white dark:text-black flex items-center gap-1 hover:opacity-90"><Check className="w-3.5 h-3.5" /> Save Architecture</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/*  Delete Modal  */}
                {isDeleteOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
                        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-md max-w-sm w-full p-6 text-center space-y-4 shadow-xl">
                            <div className="w-10 h-10 bg-red-50 dark:bg-red-950/30 text-red-500 rounded-full flex items-center justify-center mx-auto">
                                <AlertTriangle className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">Purge System Concept?</h3>
                                <p className="text-xs text-gray-400 dark:text-zinc-500 leading-relaxed">This action cannot be rolled back. The concept will be permanently wiped from the stack database.</p>
                            </div>
                            <div className="flex items-center gap-2 pt-2">
                                <button onClick={() => setIsDeleteOpen(false)} className="w-full py-2 text-xs font-medium rounded bg-gray-100 dark:bg-zinc-800 text-gray-500 hover:opacity-90">Abort</button>
                                <button onClick={handleDeleteConfirm} className="w-full py-2 text-xs font-bold rounded bg-red-600 text-white hover:bg-red-700 transition-colors">Confirm Purge</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default MyIdeasPage;