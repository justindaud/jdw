import React from 'react';

export default function Footer() {
    return (
        <>
            {/* Banner Section */}
            <section className="w-full bg-black">
                {/*
                <div className="w-full overflow-hidden">
                    <img
                        src="/assets/jdw_banner.png"
                        alt="Jakal Design Week Banner"
                        className="w-full min-h-[20vh] object-cover"
                    />
                </div>
                */}
            </section>

            {/* Footer */}
            <footer className="bg-black text-[var(--primary-cream)] py-4 flex flex-col gap-4 text-left md:flex-row md:justify-between md:items-center md:flex-wrap md:px-4 md:py-8 md:text-left relative w-full">

                {/* Left: Navigation (Flex 1 to push Center) */}
                <div className="flex justify-center flex-wrap gap-2 text-xs font-normal w-full order-2 md:flex-1 md:justify-start md:w-auto md:order-none lg:min-w-[200px]">
                    <a href="#">Home</a>
                    <a href="#about">About</a>
                    <a href="#programs">Programs</a>
                    {/*<a href="#faqs">FAQs</a>*/}
                    <a href="#">Contact</a>
                </div>

                {/* Center: Logo */}
                <div className="flex flex-row flex-wrap justify-center items-center gap-6 w-[100vw] order-1 py-4 md:py-0 md:w-auto md:order-none">
                    <img
                        src="/assets/jdw_hor_cream.png"
                        alt="JDW"
                        className="h-[30px] md:h-[20px] lg:h-[30px] w-auto"
                    />
                    <img
                        src="/assets/jdw_bar_cream_hor.png"
                        alt="JAKAL DESIGN WEEK"
                        className="h-[30px] md:h-[20px] lg:h-[30px] w-auto"
                    />
                </div>

                <div className="flex justify-center gap-4 w-full order-3 mt-4 md:flex-1 md:justify-end md:items-center md:w-auto md:order-none md:mt-0 md:min-w-[80px]">
                    <a
                        href="https://www.instagram.com/jakaldesignweek/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-[var(--primary-cream)] transition-all duration-200 hover:bg-[var(--primary-cream)]/80 hover:scale-110"
                        aria-label="Instagram"
                    >
                        <img src="/assets/sosmed/ig 3.svg" alt="Instagram" className="h-6 w-6" />
                    </a>
                    <a
                        href="https://www.tiktok.com/@jakaldesignweek"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-[var(--primary-cream)] transition-all duration-200 hover:bg-[var(--primary-cream)]/80 hover:scale-110"
                        aria-label="TikTok"
                    >
                        <img src="/assets/sosmed/tt 3.svg" alt="TikTok" className="h-6 w-6" />
                    </a>
                    <a
                        href="mailto:info@jakaldesignweek.com"
                        className="flex items-center justify-center w-10 h-10 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-[var(--primary-cream)] transition-all duration-200 hover:bg-[var(--primary-cream)]/80 hover:scale-110"
                        aria-label="Email"
                    >
                        <img src="/assets/sosmed/email 3.svg" alt="Email" className="h-6 w-6" />
                    </a>
                </div>
            </footer>
        </>
    );
}