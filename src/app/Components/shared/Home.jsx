"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Home = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            number: "01",
            badge: "Secure Vault",
            title: "The Ultimate Vault For Raw Startup Concepts.",
            subtitle: "Don't let brilliant engineering fade away in private notes. Secure your intellectual breakthroughs, compile feedback loops, and capture early traction.",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
        },
        {
            number: "02",
            badge: "Stealth Match",
            title: "Build Elite Co-Founding Teams in Stealth.",
            subtitle: "Connect with vetted full-stack developers, UI/UX perfectionists, and technical builders who are ready to transform wireframes into production code.",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
        },
        {
            number: "03",
            badge: "Vetted Capital",
            title: "Bridge The Gap Between Code And Seed Capital.",
            subtitle: "Accelerate your product architecture. Present high-fidelity markdown documentation and live prototypes directly to early-stage syndicates.",
            image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="min-h-screen bg-[#0A0A0B] text-white font-sans overflow-hidden relative">
            <div className="absolute inset-0 z-0">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out transform ${index === currentSlide
                            ? 'opacity-30 scale-100'
                            : 'opacity-0 scale-105'
                            }`}
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-[#0A0A0B]/70 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0B] via-transparent to-[#0A0A0B]/40 z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <section className="relative w-full h-[90vh] md:h-[85vh] flex flex-col justify-end pb-16 overflow-hidden">
                    
                    <div className="relative max-w-4xl grid grid-cols-1 lg:grid-cols-4 gap-2 items-end w-full">

                        {/* Left side Dynamic Index Number */}
                        <div className="hidden lg:block col-span-1 relative z-30">
                            {slides.map((slide, index) => (
                                index === currentSlide && (
                                    <div key={index} className="text-[6rem] font-black leading-none tracking-tighter text-neutral-800 animate__animated animate__fadeInUp animate__faster select-none">
                                        {slide.number}
                                    </div>
                                )
                            ))}
                        </div>

                        {/* Right side Main Content */}
                        <div className="col-span-1 lg:col-span-3 space-y-6 relative z-30">
                            {slides.map((slide, index) => (
                                index === currentSlide && (
                                    <div key={index} className="space-y-4">

                                        <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full animate__animated animate__fadeInDown">
                                            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                            <span className="text-xs font-medium tracking-widest text-neutral-300 uppercase">{slide.badge}</span>
                                        </div>

                                        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[1.05] text-white animate__animated animate__fadeInUp animate__fast">
                                            {slide.title}
                                        </h1>

                                        <p className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl leading-relaxed font-normal animate__animated animate__fadeInUp animate__delay-1s">
                                            {slide.subtitle}
                                        </p>
                                    </div>
                                )
                            ))}

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-white/10 w-full">

                                <div>
                                    <Link
                                        href="/ideas"
                                        className="inline-flex items-center gap-3 bg-white text-black hover:bg-neutral-200 px-8 py-3.5 rounded-lg font-bold text-sm tracking-wide transition-all duration-300 shadow-xl shadow-white/5"
                                    >
                                        Explore Ideas
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>

                                <div className="lg:flex md:flex hidden items-center gap-4">
                                    {slides.map((slide, index) => {
                                        const isActive = index === currentSlide;
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => setCurrentSlide(index)}
                                                className={`group relative text-left p-3 rounded-xl border transition-all duration-500 max-w-[160px] focus:outline-none backdrop-blur-md ${isActive
                                                        ? 'bg-white/[0.07] border-white/10 shadow-xl shadow-black/40 translate-y-[-4px]'
                                                        : 'bg-transparent border-transparent opacity-40 hover:opacity-70 hover:translate-y-[-2px]'
                                                    }`}
                                            >

                                                <div className="flex items-center justify-between mb-1.5">
                                                    {isActive && (
                                                        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
                                                    )}
                                                </div>

                                                <p className={`text-sm font-medium tracking-wide truncate transition-colors duration-300 ${isActive ? 'text-white' : 'text-neutral-400'
                                                    }`}>
                                                    {slide.badge}
                                                </p>

                                                <div className="w-full h-[2px] bg-white/5 mt-2.5 relative overflow-hidden rounded-full">
                                                    {isActive && (
                                                        <div className="absolute inset-0 bg-gradient-to-r from-neutral-400 to-white origin-left animate-[progress_5s_linear_infinite]" />
                                                    )}
                                                </div>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;