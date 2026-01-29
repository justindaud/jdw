'use client';

import React, { useState } from 'react';
import { useSearch } from '../contexts/SearchContext';
import { HighlightedText } from './HighlightedText';

export const faqData = [
    {
        question: "What is Jakal Design Week?",
        answer: "Jakal Design Week celebrates design in an annual program of talks, tours, exhibitions, launches, installations, and workshops across the creative corridor of Jalan Kaliurang. The program is driven by ideas through providing a platform for designers, educators, enthusiasts, thinkers, and businesses to come together to share these ideas."
    },
    {
        question: "Ini hanya memuat contoh pertanyaan",
        answer: "Ini hanya memuat contoh jawaban"
    },
    {
        question: "Where can I find the full program schedule?",
        answer: "The complete program schedule will be available on our website closer to the event dates. Follow our social media for updates and announcements."
    },
    {
        question: "Who is behind Jakal Design Week?",
        answer: "JDW is organized by a collective of local creative communities, academic institutions, and businesses along the Jalan Kaliurang corridor."
    },
    {
        question: "I want to attend some events at Jakal Design Week, how can I do that?",
        answer: "Tiket info coming soon! Stay tuned to our social media for the latest updates on event registration."
    },
    {
        question: "Is Jakal Design Week free?",
        answer: "Many events at Jakal Design Week are free and open to the public, while some specialized workshops or talks may require a ticket purchasing."
    },
    {
        question: "Is Jakal Design Week accessible?",
        answer: "We strive to make JDW accessible to everyone. Venue accessibility information will be provided in the program guide."
    },
    {
        question: "Can I volunteer at Jakal Design Week?",
        answer: "Yes! We welcome volunteers to help make JDW a success. Volunteer opportunities will be announced on our website and social media."
    },
    {
        question: "I want to attend some events at Jakal Design Week, how can I do that?",
        answer: "Tiket info coming soon! Stay tuned to our social media for the latest updates on event registration."
    },
    {
        question: "How can I become a partner or sponsor?",
        answer: "We're always looking for partners and sponsors who share our vision. Please contact us through our website for partnership opportunities."
    },
    {
        question: "Is Jakal Design Week free?",
        answer: "Many events at Jakal Design Week are free and open to the public, while some specialized workshops or talks may require a ticket purchasing."
    },
    {
        question: "Where can I find the full program schedule?",
        answer: "The complete program schedule will be available on our website closer to the event dates. Follow our social media for updates and announcements."
    }
];

export default function FAQ() {
    // Calculate initial open items: first in col1, middle in col2, last in col3
    const itemsPerColumn = Math.ceil(faqData.length / 3);
    const col2MiddleIndex = itemsPerColumn + Math.floor(itemsPerColumn / 2);
    const lastIndex = faqData.length - 1;

    const [openIndexes, setOpenIndexes] = useState<Set<number>>(new Set([0, col2MiddleIndex, lastIndex]));
    const { searchQuery, searchResults, currentResultIndex } = useSearch();

    const toggleFAQ = (index: number) => {
        setOpenIndexes(prev => {
            const newSet = new Set(prev);
            if (newSet.has(index)) {
                newSet.delete(index);
            } else {
                newSet.add(index);
            }
            return newSet;
        });
    };

    // Split FAQ items into 3 columns
    const column1 = faqData.slice(0, itemsPerColumn);
    const column2 = faqData.slice(itemsPerColumn, itemsPerColumn * 2);
    const column3 = faqData.slice(itemsPerColumn * 2);

    const renderFAQItem = (item: typeof faqData[0], index: number) => {
        const currentResult = searchResults[currentResultIndex];
        const isCurrentFaq = currentResult?.type?.startsWith('faq') && currentResult?.index === index;
        return (
            <div key={index} id={`faq-${index}`} className="border-b border-black">
                <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center py-4 bg-transparent border-none cursor-pointer text-left text-xl font-normal text-[var(--primary-orange)]"
                >
                    <HighlightedText text={item.question} query={searchQuery} isActive={isCurrentFaq} />
                    <span className={`text-base font-normal transition-transform duration-300 ease-in-out ${openIndexes.has(index) ? 'rotate-0' : 'rotate-180'}`}>
                        ^
                    </span>
                </button>

                <div className={`overflow-hidden transition-[max-height,opacity,padding] duration-300 ease-in-out ${openIndexes.has(index) ? 'max-h-[500px] opacity-100 pb-12' : 'max-h-0 opacity-0 pb-0'}`}>
                    <p className="text-lg leading-relaxed font-normal text-black">
                        <HighlightedText text={item.answer} query={searchQuery} isActive={isCurrentFaq} />
                    </p>
                </div>
            </div>
        );
    };

    return (
        <div className="w-full max-w-7xl mx-auto text-left text-black md:grid md:grid-cols-3 md:gap-8">
            {/* Column 1 */}
            <div className="flex flex-col">
                {column1.map((item, idx) => renderFAQItem(item, idx))}
            </div>

            {/* Column 2 */}
            <div className="flex flex-col md:flex-col">
                {column2.map((item, idx) => renderFAQItem(item, itemsPerColumn + idx))}
            </div>

            {/* Column 3 */}
            <div className="flex flex-col md:flex-col">
                {column3.map((item, idx) => renderFAQItem(item, itemsPerColumn * 2 + idx))}
            </div>
        </div>
    );
}
