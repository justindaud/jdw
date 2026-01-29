'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type SearchResultType = 'program-title' | 'program-desc' | 'faq-question' | 'faq-answer' | 'about';

export interface SearchResult {
    type: SearchResultType;
    index: number;
    text: string;
    elementId?: string;
    programId?: number;
}

interface SearchContextType {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchResults: SearchResult[];
    setSearchResults: (results: SearchResult[]) => void;
    currentResultIndex: number;
    setCurrentResultIndex: (index: number) => void;
    isSearching: boolean;
    nextResult: () => void;
    prevResult: () => void;
    clearSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: ReactNode }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [currentResultIndex, setCurrentResultIndex] = useState(0);

    const isSearching = searchQuery.length > 0;

    const nextResult = useCallback(() => {
        if (searchResults.length === 0) return;
        setCurrentResultIndex((prev) => (prev + 1) % searchResults.length);
    }, [searchResults.length]);

    const prevResult = useCallback(() => {
        if (searchResults.length === 0) return;
        setCurrentResultIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
    }, [searchResults.length]);

    const clearSearch = useCallback(() => {
        setSearchQuery('');
        setSearchResults([]);
        setCurrentResultIndex(0);
    }, []);

    return (
        <SearchContext.Provider
            value={{
                searchQuery,
                setSearchQuery,
                searchResults,
                setSearchResults,
                currentResultIndex,
                setCurrentResultIndex,
                isSearching,
                nextResult,
                prevResult,
                clearSearch,
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}
