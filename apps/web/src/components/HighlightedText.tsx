import React from 'react';

interface HighlightedTextProps {
    text: string;
    query: string;
    isActive?: boolean;
    className?: string;
}

export function HighlightedText({ text, query, isActive = false, className = '' }: HighlightedTextProps) {
    if (!query || query.trim() === '') {
        return <>{text}</>;
    }

    const parts = text.split(new RegExp(`(${query})`, 'gi'));

    return (
        <>
            {parts.map((part, index) => {
                const isMatch = part.toLowerCase() === query.toLowerCase();
                return isMatch ? (
                    <mark
                        key={index}
                        className={`${isActive ? 'bg-[var(--primary-orange)] text-white' : 'bg-yellow-200 text-black'} px-0.5 rounded`}
                    >
                        {part}
                    </mark>
                ) : (
                    <span key={index} className={className}>{part}</span>
                );
            })}
        </>
    );
}
