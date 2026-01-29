import React from 'react';

export default function LeftSidebar() {
    const repetitions = Array.from({ length: 10 }); // Repeat content for seamless loop

    return (
        <aside className="hidden md:flex fixed left-0 top-0 h-screen w-[50px] bg-black text-[var(--primary-orange)] overflow-hidden z-40 border-r border-white/10 justify-center">
            <div className="flex flex-col animate-scrollVertical whitespace-nowrap">
                {repetitions.map((_, i) => (
                    <div key={i} className="flex flex-col items-center gap-8 pb-8">
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">JAKAL DESIGN WEEK</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">21 Agustus - 5 September 2026</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">JAKAL DESIGN MAP</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">Festival Budaya Warga</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">GIK Lab Seni</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">Mampir Gelanggang</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">JDW Design Exhibition</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">JDW Community Run</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">JDW x Bike2Ngopi</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">Permata</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">Ruang Dengar</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">Jeda</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">Bookshop Festival</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">JAKAL DESIGN WEEK</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">21 Agustus - 5 September 2026</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">JAKAL DESIGN MAP</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">Festival Budaya Warga</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">GIK Lab Seni</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">Mampir Gelanggang</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">JDW Design Exhibition</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">JDW Community Run</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">JDW x Bike2Ngopi</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">Permata</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">Ruang Dengar</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">Jeda</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                        <span className="[writing-mode:vertical-rl] rotate-180 font-normal text-[1.2rem] uppercase">Bookshop Festival</span>
                        <span className="[writing-mode:vertical-rl] rotate-180 text-[var(--primary-orange)] text-base"> • </span>
                    </div>
                ))}
            </div>
        </aside>
    );
}
