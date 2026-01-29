'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useSearch } from '../contexts/SearchContext';

export default function RightSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { searchQuery, setSearchQuery, searchResults, currentResultIndex, nextResult, prevResult, clearSearch } = useSearch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    clearSearch();
  };

  return (
    <aside className={`
      bg-[var(--primary-orange)] text-[var(--primary-cream)] z-50 overflow-hidden transition-all duration-300 ease-in-out
      ${/* Mobile Base */ ''}
      absolute top-0 left-0 w-full flex flex-row-reverse justify-between items-start px-4 py-2
      ${isOpen ? 'fixed h-[50vh] overflow-y-auto' : 'h-auto'}
      
      ${/* Desktop Base */ ''}
      md:fixed md:right-0 md:top-0 md:h-screen md:flex-col md:justify-between md:items-center md:py-8 md:px-0 md:left-auto
      ${isOpen ? 'md:w-[25vw] md:pl-[calc(25vw-100px)]' : 'md:w-[100px]'}
    `.trim().replace(/\s+/g, ' ')}>
      <div className="w-full flex justify-center md:w-auto justify-end">

        <button
          className="bg-transparent border-none cursor-pointer flex flex-col items-center gap-2.5 relative z-[60]"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          <div className="flex justify-center items-center w-full h-auto">
            <Image
              src={isOpen ? "/assets/menu_x_cream.png" : "/assets/menu_but_cream.png"}
              alt={isOpen ? "Close" : "Menu"}
              width={isOpen ? 80 : 80}
              height={isOpen ? 80 : 100}
              className="object-contain w-full h-auto max-w-[25px]"
            />
          </div>
        </button>

      </div>

      {/* Navigation Links Overlay */}
      <nav className={`
        flex flex-col gap-2 text-left w-[200px] transition-opacity duration-200
        ${/* Mobile Position */ ''}
        absolute top-[50px] left-4
        ${/* Desktop Position */ ''}
        md:top-8 md:left-10
        ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        <a href="#" className="text-2xl font-normal text-[var(--primary-cream)] no-underline hover:text-black cursor-pointer" onClick={() => setIsOpen(false)}>Home</a>
        <a href="#about" className="text-2xl font-normal text-[var(--primary-cream)] no-underline hover:text-black cursor-pointer" onClick={() => setIsOpen(false)}>About</a>
        <a href="#programs" className="text-2xl font-normal text-[var(--primary-cream)] no-underline hover:text-black cursor-pointer" onClick={() => setIsOpen(false)}>Programs</a>
        {/* <a href="#faqs" className="text-2xl font-normal text-[var(--primary-cream)] no-underline hover:text-black cursor-pointer" onClick={() => setIsOpen(false)}>FAQs</a> */}
        <a href="#" className="text-2xl font-normal text-[var(--primary-cream)] no-underline hover:text-black cursor-pointer" onClick={() => setIsOpen(false)}>Contact</a>
      </nav>

      {/* Search Bar with Controls */}
      <div className={`
        flex flex-col gap-2 transition-opacity duration-200
        absolute bottom-5 left-5 md:left-10
        ${isOpen ? 'opacity-100 delay-200' : 'opacity-0 pointer-events-none'}
      `}>
        {/* Search Input */}
        <div className="relative w-full md:w-[10vw]">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-transparent border-b border-white pb-1 text-white w-full outline-none text-base placeholder-white/60 pr-6"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-0 top-0 bg-transparent border-none text-white/60 hover:text-white cursor-pointer text-lg"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Search Controls */}
        {searchQuery && (
          <div className="flex items-center gap-2 text-sm text-white/80">
            <span className="text-xs">
              {searchResults.length > 0
                ? `${currentResultIndex + 1} of ${searchResults.length}`
                : 'No results'}
            </span>
            <div className="flex gap-1">
              <button
                onClick={prevResult}
                disabled={searchResults.length === 0}
                className="bg-white/20 hover:bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed border-none text-white px-2 py-1 rounded cursor-pointer text-xs"
                aria-label="Previous result"
              >
                ↑
              </button>
              <button
                onClick={nextResult}
                disabled={searchResults.length === 0}
                className="bg-white/20 hover:bg-white/30 disabled:bg-white/10 disabled:cursor-not-allowed border-none text-white px-2 py-1 rounded cursor-pointer text-xs"
                aria-label="Next result"
              >
                ↓
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-auto flex justify-start md:pt-2 md:w-2/5 md:justify-center md:items-start md:pt-0 md:pb-0">
        <Image
          src="/assets/jdw_bar_cream.png"
          width={80}
          height={300}
          className="object-contain w-full h-auto max-w-[[150px]] hidden md:block"
          alt="JDW"
        />
        <Image
          src="/assets/jdw_bar_cream_hor.png"
          width={300}
          height={80}
          alt="JAKAL DESIGN WEEK"
          className="object-contain w-full h-[40px] block md:hidden"
        />
        {/*
        <Image
          src="/assets/jdw_hor_cream.png"
          width={300}
          height={80}
          className="object-contain w-full h-auto max-w-[150px] block md:hidden"
          alt="JDW Mobile"
        />
        */}
      </div>
    </aside>
  );
}
