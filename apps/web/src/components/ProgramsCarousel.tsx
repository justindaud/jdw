'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useSearch } from '../contexts/SearchContext';
import { HighlightedText } from './HighlightedText';

type Program = {
    id: number;
    title: string;
    desc: string;
    image: string;
};

interface ProgramsCarouselProps {
    programs: Program[];
    isDark: boolean;
}

export default function ProgramsCarousel({ programs, isDark }: ProgramsCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { searchQuery, searchResults, currentResultIndex } = useSearch();

    // Handle modal interactions (ESC key and body scroll lock)
    useEffect(() => {
        if (isModalOpen) {
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';

            // Handle ESC key press
            const handleEscape = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    closeModal();
                }
            };

            window.addEventListener('keydown', handleEscape);

            return () => {
                document.body.style.overflow = 'unset';
                window.removeEventListener('keydown', handleEscape);
            };
        }
    }, [isModalOpen]);

    const openModal = (program: Program) => {
        setSelectedProgram(program);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProgram(null);
    };

    const navigateModal = (direction: 'prev' | 'next') => {
        if (!selectedProgram) return;

        const currentIndex = programs.findIndex(p => p.id === selectedProgram.id);
        let newIndex;

        if (direction === 'prev') {
            newIndex = currentIndex > 0 ? currentIndex - 1 : programs.length - 1;
        } else {
            newIndex = currentIndex < programs.length - 1 ? currentIndex + 1 : 0;
        }

        setSelectedProgram(programs[newIndex]);
    };

    const getPrevProgram = () => {
        if (!selectedProgram) return null;
        const currentIndex = programs.findIndex(p => p.id === selectedProgram.id);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : programs.length - 1;
        return programs[prevIndex];
    };

    const getNextProgram = () => {
        if (!selectedProgram) return null;
        const currentIndex = programs.findIndex(p => p.id === selectedProgram.id);
        const nextIndex = currentIndex < programs.length - 1 ? currentIndex + 1 : 0;
        return programs[nextIndex];
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth } = scrollContainerRef.current;
            // Calculate actual slide width including gap
            const slideWidth = scrollWidth / programs.length;
            const scrollIndex = Math.round(scrollLeft / slideWidth);
            const safeIndex = Math.min(Math.max(scrollIndex, 0), programs.length - 1);
            if (safeIndex !== activeIndex) {
                setActiveIndex(safeIndex);
            }
        }
    };

    const scrollToSlide = (index: number) => {
        if (scrollContainerRef.current) {
            const scrollWidth = scrollContainerRef.current.clientWidth;
            scrollContainerRef.current.scrollTo({
                left: index * scrollWidth,
                behavior: 'smooth',
            });
            setActiveIndex(index);
        }
    };

    return (
        <>
            <div className="relative w-full h-full flex flex-col justify-center md:block md:h-auto">
                <div
                    className="flex flex-row overflow-x-auto gap-2 px-5 h-full items-center no-scrollbar snap-x snap-mandatory md:flex md:gap-4 md:p-0 md:pl-[50px] md:pr-[100px] md:overflow-x-auto md:overflow-y-hidden md:snap-mandatory md:scroll-smooth md:no-scrollbar"
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                >
                    {programs.map((program, index) => {
                        const isAlternate = index % 2 === 1;
                        const isCurrentSearchResult = searchResults[currentResultIndex]?.programId === program.id;
                        return (
                            <div
                                key={`${program.id}-${index}`}
                                id={`program-${program.id}`}
                                className="w-[90vw] h-screen border-none bg-transparent flex flex-col justify-start relative box-border snap-center shrink-0 md:w-[30vw] md:h-auto md:block md:snap-center cursor-pointer"
                                onClick={() => openModal(program)}
                            >
                                <div className="absolute top-[10vh] left-0 w-full h-[70vh] rounded-[0px] z-10 overflow-hidden shadow-2xl md:relative md:top-0 md:left-0 md:w-full md:h-[600px] md:shadow-none">
                                    <div
                                        className="w-full h-full bg-cover bg-center animate-slowZoom"
                                        style={{ backgroundImage: `url('${program.image}')` }}
                                    ></div>
                                </div>

                                {/* Title Box */}
                                <div className="absolute top-0 left-0 right-0 w-full z-20 text-center bg-transparent px-4 h-[10vh] flex items-center justify-center md:hidden">
                                    <h4 className="text-2xl leading-tight text-[var(--primary-cream)] uppercase font-normal m-0 break-words w-full">
                                        <HighlightedText text={program.title} query={searchQuery} isActive={isCurrentSearchResult} />
                                    </h4>
                                </div>
                                <div className={`hidden md:flex flex-row items-center justify-between p-4 mt-0 ${isAlternate ? 'bg-black text-[var(--primary-orange)]' : 'bg-[var(--primary-orange)] text-[var(--primary-cream)]'}`}>
                                    <h4 className="text-xl font-bold uppercase m-0 leading-tight line-clamp-1 flex-1 mr-4">
                                        <HighlightedText text={program.title} query={searchQuery} isActive={isCurrentSearchResult} />
                                    </h4>
                                    <span
                                        className="font-normal text-sm cursor-pointer whitespace-nowrap hover:underline flex-shrink-0"
                                        onClick={(e) => { e.stopPropagation(); openModal(program); }}
                                    >
                                        More...
                                    </span>
                                </div>

                                <div className="absolute bottom-5 left-0 right-0 z-20 px-8 py-2 bg-gradient-to-t from-black/95 to-transparent flex flex-col gap-0 items-start md:static md:bg-none md:p-4 md:block">
                                    <div className="text-[var(--primary-cream)] text-sm text-left m-0 line-clamp-2 md:text-black md:text-lg md:line-clamp-4">
                                        <HighlightedText text={program.desc} query={searchQuery} isActive={isCurrentSearchResult} />
                                    </div>
                                    <button
                                        className="w-full bg-[var(--primary-orange)] text-black font-bold p-2 rounded-xl border-none text-[0.95rem] cursor-pointer mt-2 block md:hidden"
                                        onClick={(e) => { e.stopPropagation(); openModal(program); }}
                                    >
                                        More
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Desktop Navigation Chevrons */}
                <button
                    className="hidden md:flex absolute top-1/2 left-5 -translate-y-1/2 z-40 w-12 h-12 justify-center items-center bg-black/50 hover:bg-black/70 rounded-full border-none cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => {
                        if (scrollContainerRef.current) {
                            scrollContainerRef.current.scrollBy({ left: -window.innerWidth * 0.3, behavior: 'smooth' });
                        }
                    }}
                >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 18L9 12L15 6" stroke={isDark ? "#faf5de" : "#faf5de"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <button
                    className="hidden md:flex absolute top-1/2 right-5 -translate-y-1/2 z-40 w-12 h-12 justify-center items-center bg-black/50 hover:bg-black/70 rounded-full border-none cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => {
                        if (scrollContainerRef.current) {
                            scrollContainerRef.current.scrollBy({ left: window.innerWidth * 0.3, behavior: 'smooth' });
                        }
                    }}
                >
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 18L15 12L9 6" stroke={isDark ? "#faf5de" : "#faf5de"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                {/* Dots Navigation */}
                <div className="absolute bottom-[0vh] left-1/2 -translate-x-1/2 w-auto z-30 flex justify-center gap-2.5 p-0 bg-transparent md:hidden">
                    {programs.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer p-0 border-none ${index === activeIndex ? 'bg-[var(--primary-orange)] w-5 rounded-[10px]' : 'bg-white/20 md:bg-black'}`}
                            onClick={() => scrollToSlide(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Modal Overlay */}
            {isModalOpen && selectedProgram && (() => {
                const prevProgram = getPrevProgram();
                const nextProgram = getNextProgram();

                return (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn md:mr-[100px] md:ml-[50px]"
                        onClick={closeModal}
                    >
                        {/* Desktop Preview - Previous Program (hidden on mobile) */}
                        {prevProgram && (
                            <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-[30%] h-[80vh] pointer-events-none overflow-hidden opacity-40">
                                <div className="relative w-full h-full bg-white shadow-2xl scale-90 origin-right">
                                    <div className="h-80 overflow-hidden">
                                        <div
                                            className="w-full h-full bg-cover bg-center"
                                            style={{ backgroundImage: `url('${prevProgram.image}')` }}
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h2 className="text-xl font-bold uppercase text-[var(--primary-orange)] mb-2 line-clamp-2">
                                            {prevProgram.title}
                                        </h2>
                                        <p className="text-sm text-gray-800 line-clamp-3">
                                            {prevProgram.desc}
                                        </p>
                                    </div>
                                </div>
                                {/* Fade overlay on right edge */}
                                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/80 to-transparent pointer-events-none" />
                            </div>
                        )}

                        {/* Main Modal - Current Program */}
                        <div
                            className="relative w-full max-w-2xl h-[90vh] md:h-[80vh] bg-white shadow-2xl overflow-hidden z-10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full border-none cursor-pointer transition-all"
                                onClick={closeModal}
                                aria-label="Close modal"
                            >
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18M6 6L18 18" stroke={isDark ? "#faf5de" : "#faf5de"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>

                            {/* Modal Content */}
                            <div className="overflow-y-auto h-full">
                                {/* Program Image */}
                                <div className="w-full h-[50vh] md:h-80 overflow-hidden flex-shrink-0">
                                    <div
                                        className="w-full h-full bg-cover bg-center"
                                        style={{ backgroundImage: `url('${selectedProgram.image}')` }}
                                    />
                                </div>

                                {/* Program Details */}
                                <div className="p-6 md:p-8">
                                    <h2 className="text-2xl md:text-3xl font-bold uppercase text-[var(--primary-orange)] mb-4 leading-tight">
                                        <HighlightedText text={selectedProgram.title} query={searchQuery} isActive={searchResults[currentResultIndex]?.programId === selectedProgram.id} />
                                    </h2>
                                    <p className="text-base md:text-lg text-gray-800 leading-relaxed whitespace-pre-line">
                                        <HighlightedText text={selectedProgram.desc} query={searchQuery} isActive={searchResults[currentResultIndex]?.programId === selectedProgram.id} />
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Desktop Preview - Next Program (hidden on mobile) */}
                        {nextProgram && (
                            <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[30%] h-[80vh] pointer-events-none overflow-hidden opacity-40">
                                <div className="relative w-full h-full bg-white shadow-2xl scale-90 origin-left">
                                    <div className="h-80 overflow-hidden">
                                        <div
                                            className="w-full h-full bg-cover bg-center"
                                            style={{ backgroundImage: `url('${nextProgram.image}')` }}
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h2 className="text-xl font-bold uppercase text-[var(--primary-orange)] mb-2 line-clamp-2">
                                            {nextProgram.title}
                                        </h2>
                                        <p className="text-sm text-gray-800 line-clamp-3">
                                            {nextProgram.desc}
                                        </p>
                                    </div>
                                </div>
                                {/* Fade overlay on left edge */}
                                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/80 to-transparent pointer-events-none" />
                            </div>
                        )}

                        {/* Navigation Arrows - Outside Modal */}
                        <button
                            className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full border-none cursor-pointer transition-all shadow-lg z-20"
                            onClick={(e) => { e.stopPropagation(); navigateModal('prev'); }}
                            aria-label="Previous program"
                        >
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 18L9 12L15 6" stroke={isDark ? "#faf5de" : "#faf5de"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <button
                            className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/50 hover:bg-black/70 rounded-full border-none cursor-pointer transition-all shadow-lg z-20"
                            onClick={(e) => { e.stopPropagation(); navigateModal('next'); }}
                            aria-label="Next program"
                        >
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 18L15 12L9 6" stroke={isDark ? "#faf5de" : "#faf5de"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                );
            })()}
        </>
    );
}
