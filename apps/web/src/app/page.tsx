'use client';

import React, { useRef, useState, useEffect } from 'react';
import FAQ, { faqData } from '../components/FAQ';
import ProgramsCarousel from '../components/ProgramsCarousel';
import { useSearch, SearchResult } from '../contexts/SearchContext';
import { HighlightedText } from '../components/HighlightedText';
import ZebraCrossSequence from '@/components/ZebraCrossSequence';

const PROGRAMS_DATA = [
  {
    id: 1,
    title: 'JAKAL DESIGN MAP',
    desc: 'Jakal Design Map adalah platform berbasis web berupa peta terkurasi yang menjadi panduan utama selama Jakal Design Week. Platform ini menampilkan lokasi venue, program, dan beragam aktivitas, mulai dari pameran, diskusi, workshop, hingga pop-up event yang tersebar di sepanjang koridor Jalan Kaliurang. Dirancang sebagai alat navigasi sekaligus kurasi, Jakal Design Map membantu pengunjung menemukan, merencanakan, dan mengalami keseluruhan ekosistem acara secara utuh, kontekstual, dan mudah diakses.',
    image: '/program/designmap.png'
  },
  {
    id: 2,
    title: 'Festival Budaya Warga',
    desc: 'Festival Budaya Warga (FBW) hadir sebagai platform kolaboratif bagi akademisi, seniman, mahasiswa, dan masyarakat umum untuk melestarikan budaya melalui jalur edukasi dan partisipasi aktif. Festival lintas komunitas ini mendorong keterlibatan publik dalam seni, sekaligus memperkuat sinergi antara universitas, komunitas seni, dan masyarakat luas. FBW menjadi model inklusif bagi keterlibatan budaya yang memperkokoh ekosistem budaya Indonesia.',
    image: '/program/fbw.jpg'
  },
  {
    id: 3,
    title: 'GIK Lab Seni',
    desc: 'GIK Lab Seni merupakan inkubator yang menjembatani dunia akademik dengan ekosistem seni Yogyakarta yang dinamis. Dirancang bagi mahasiswa yang antusias terhadap budaya, program ini mengintegrasikan pelatihan, residensi, dan proyek kolaboratif guna menciptakan karya seni yang berdampak sosial. Berakar pada kekayaan warisan budaya kota, program ini memberdayakan generasi kreator masa depan untuk mengubah wawasan akademik menjadi kontribusi artistik yang bermakna.',
    image: '/program/labseni.jpg'
  },
  {
    id: 4,
    title: 'Mampir Gelanggang',
    desc: 'Mampir Gelanggang adalah art fair exhibition yang mempertemukan 25 seniman lintas generasi dalam suasana dialog dan kolaborasi. Selama tiga minggu bersinergi dengan Festival Run\'nShine, Galeri Bulaksumur bertransformasi menjadi ruang hidup tempat karya, ide, dan publik saling berjumpa, merayakan keberagaman praktik seni kontemporer Indonesia.',
    image: '/program/mampirgelanggang.png'
  },
  {
    id: 5,
    title: 'JDW Design Exhibition',
    desc: 'JDW Design Exhibition merupakan pameran desain yang diinisiasi bersama komunitas Yogyakarta Young Architect Forum (YYAF) serta Program Studi Arsitektur UII dan UGM, dengan EDSU Gallery sebagai venue utama. Pameran ini menjadi ruang temu gagasan lintas generasi mempertemukan arsitek muda, mahasiswa, dan praktisi untuk menampilkan karya, riset, serta eksplorasi desain yang relevan dengan konteks kota dan masa depan arsitektur. Lebih dari sekadar etalase karya, JDW Design Exhibition dirancang sebagai ruang dialog: tentang proses, keberanian bereksperimen, dan posisi arsitektur dalam ekosistem kreatif Yogyakarta pada umumnya dan Jl Kaliurang pada khususnya. Melalui pameran ini, JDW mendorong pertukaran ide, jejaring kolaboratif, dan tumbuhnya budaya kritik yang sehat antara dunia akademik dan praktik profesional.',
    image: '/program/designexb.png'
  },
  {
    id: 6,
    title: 'JDW Community Run',
    desc: 'JDW Community Run adalah kegiatan lari komunitas yang menjadi bagian dari program Galeri Bulaksumur dan Jakal Design Week (JDW), sekaligus berfungsi sebagai shake out run menuju Run\'nShine 2026. Dimulai dari venue terpilih di koridor Jalan Kaliurang, rute lari ini dirancang melintasi sejumlah venue, ruang kreatif, dan titik aktivitas yang terlibat dalam rangkaian JDW. Lebih dari sekadar olahraga, JDW Community Run menjadi medium untuk mengalami kota secara perlahan merasakan arsitektur, desain, dan kehidupan kreatif Jakal sambil berolahraga. Acara ini mempertemukan pelari, desainer, arsitek, mahasiswa, dan publik umum dalam suasana santai dan inklusif, membuka ruang interaksi lintas disiplin sekaligus memperkuat relasi antara kota, komunitas, dan kreativitas',
    image: '/program/comrun.jpg'
  },
  {
    id: 7,
    title: 'JDW x Bike2Ngopi',
    desc: 'JJDW x Bike2Ngopi adalah Café Hopping Ride, sebuah kegiatan bersepeda santai yang diinisiasi sebagai bagian dari rangkaian Jakal Design Week (JDW) bersama komunitas Bike2Ngopi. Program ini mengajak peserta menjelajahi koridor Jakal dengan sepeda, singgah dari satu kafe ke kafe lain yang sekaligus menjadi venue dan titik aktivitas JDW. Rute dirancang ringan dan inklusif, memungkinkan peserta menikmati kota, arsitektur, dan atmosfer kreatif Jakal secara perlahan dan personal. Setiap pemberhentian menjadi ruang temu antara pelaku kreatif, desainer, arsitek, dan pengunjung untuk berbincang, bertukar ide, dan merayakan budaya urban yang hidup. JDW Café Hopping Ride menempatkan mobilitas berkelanjutan sebagai bagian dari pengalaman desain, menjadikan kota bukan sekadar latar, tetapi medium interaksi dan kolaborasi.',
    image: '/program/bike2ngopi.jpg'
  },
  {
    id: 8,
    title: 'Permata',
    desc: 'Permata hadir sebagai wadah pengembangan kecerdasan majemuk melalui medium film dan gambar bergerak, yang digagas oleh Ruas Bambu Nusa dan Suara Dewandaru, diselenggarakan sebulan sekali setiap bulannya. Dirancang dengan fokus pada Eksebisi, Eksplorasi, dan Distribusi Pengetahuan dari dalam dan luar film serta gambar bergerak, Permata membuka ruang interaktif yang tidak hanya membangun apresiasi, tetapi juga menstimulasi beragam cara berpikir dan ekspresi diri; mulai dari bahasa, musik, interaksi sosial, hingga gerak tubuh. Beberapa kecerdasan yang diasah dalam program ini merujuk pada kerangka Multiple Intelligences dari Howard Gardner, yang mencakup sembilan kecerdasan dasar seperti linguistik, musikal, interpersonal, hingga kinestetik.',
    image: '/program/permata.png'
  },
  {
    id: 9,
    title: 'Ruang Dengar',
    desc: 'Ruang Dengar adalah program dengar album bulanan yang diinisiasi oleh Suara Dewandaru dan Ruas Bambu Nusa. Program ini mengajak partisipan untuk mendengarkan satu album musik secara utuh, tanpa jeda, dengan sikap khidmat dan minim distraksi. Proses mendengar dilakukan menggunakan tata suara yang baik, sehingga pendengar dapat merasakan detail artistik dan teknis karya secara menyeluruh. Ruang Dengar hadir sebagai respon atas kebiasaan konsumsi musik masa kini yang sering terpecah dan dilakukan sambil beraktivitas lain. Dengan memanfaatkan Suara Dewandaru sebagai ruang dengar, perpustakaan, dan ruang interaksi musik, Ruang Dengar menjadi wadah apresiasi dan kritik musik secara mendalam. Fokus pada musik dalam negeri, program ini juga membuka ruang pertemuan antara musisi, pendengar, kritikus, peneliti, dan akademisi untuk berbagi pengalaman, berdiskusi, serta merajut jejaring yang melampaui musik itu sendiri.',
    image: '/program/ruangdengar.png'
  },
  {
    id: 10,
    title: 'Jeda',
    desc: 'Modernitas seringkali menawarkan kepada kita sebuah kehidupan mirip lintasan lari dimana mesin industri, teknologi telekomunikasi dan kecerdasan artifisial menjadi lawan kita. Manusia lalu berlari kencang menuju garis finish bertuliskan sukses dan bahagia. Tetapi kita tak pernah sampai di sana, sebab sukses dan bahagia adalah proses bukan hasil. Mekanisme yang demikian sangat menguras sumber daya, bahkan acap kali membuat manusia kehilangan kemanusiaannya. Satu hal yang bisa dilakukan ketika kita terjebak dalam situasi itu adalah jeda, yang berarti mengambil jarak dari rutinitas, meneliti kesatuan mind, body dan spirit, untuk memulihkan lagi kemanusiaan. Program JEDA adalah salah satu cara untuk kembali kepada kesadaran tubuh, jiwa dan ruhani. Ruas Bambu Nusa menyediakan ruang rehat untuk mengurai pengalaman intrinsik secara verbal dan membuka register sensori melalui journaling dan olah tubuh. Program JEDA membawa kita menjumpai diri dengan welas asih',
    image: '/program/jeda.jpg'
  },
  {
    id: 11,
    title: 'Bookshop Festival',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam aliquet urna augue, non dictum erat condimentum id. Vivamus consectetur ipsum sollicitudin, commodo ligula ac, fermentum mi. Nullam eget dui et ligula efficitur euismod. Maecenas faucibus velit quis nibh lacinia, sed ullamcorper arcu sollicitudin. Nullam sed metus vel turpis porta tincidunt sit amet in risus. Pellentesque porttitor diam feugiat leo auctor condimentum.',
    image: '/program/jeda.jpg'
  },
];

const ABOUT_TEXT = [
  "Jakal Design Week (JDW) adalah sebuah perjalanan kreatif di sepanjang Jalan Kaliurang, tempat di mana intelektualitas dan kreativitas berkelindan. JDW ingin turut berkontribusi dalam memperkuat ekosistem kreatif yang lebih terhubung, lebih luas jangkauannya, dan berkembang melalui berbagai inisiatif publik untuk mengakses informasi, dan mengalami peristiwa budaya secara langsung.",
  "Lebih jauh JDW ingin meneguhkan Jalan Kaliurang sebagai koridor kreatif yang bergairah dan berkelanjutan. Melalui kolaborasi antar ruang dan komunitas, mulai dari ruang akademik, galeri seni, kedai kopi, toko buku, dan ruang-ruang kreatif lain, menghadirkan berbagai kegiatan mulai dari ekshibisi, diskusi, pementasan, lokakarya dan lain-lain. JDW ingin turut berkontribusi dalam memperkuat ekosistem kreatif yang lebih terhubung, lebih luas jangkauannya, dan berkembang melalui berbagai inisiatif."
];

export default function Home() {
  const aboutRef = useRef<HTMLElement>(null);
  const faqRef = useRef<HTMLElement>(null);
  const programsRef = useRef<HTMLElement>(null);
  const [isAboutWhite, setIsAboutWhite] = useState(false);
  const [isFAQWhite, setIsFAQWhite] = useState(false);
  const [isProgramsDark, setIsProgramsDark] = useState(false);
  const [isMobile, setIsMobile] = useState(true); // Default to mobile for SSR

  const { searchQuery, setSearchResults, currentResultIndex, searchResults } = useSearch();

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Only enable background transitions on mobile
    if (!isMobile) {
      // On desktop, keep sections at their default colors
      return;
    }

    const observerOptions = {
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target.id === 'about') {
          setIsAboutWhite(entry.isIntersecting);
        }
        if (entry.target.id === 'faqs') {
          setIsFAQWhite(entry.isIntersecting);
        }
        if (entry.target.id === 'programs') {
          setIsProgramsDark(entry.isIntersecting);
        }
      });
    }, observerOptions);

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (faqRef.current) observer.observe(faqRef.current);
    if (programsRef.current) observer.observe(programsRef.current);

    return () => observer.disconnect();
  }, [isMobile]);

  // Search logic
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults([]);
      return;
    }

    const results: SearchResult[] = [];
    const lowerQuery = searchQuery.toLowerCase();

    // Search in programs
    PROGRAMS_DATA.forEach((program, index) => {
      if (program.title.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'program-title',
          index,
          text: program.title,
          elementId: `program-${program.id}`,
          programId: program.id,
        });
      }
      if (program.desc.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'program-desc',
          index,
          text: program.desc,
          elementId: `program-${program.id}`,
          programId: program.id,
        });
      }
    });

    // Search in About section
    ABOUT_TEXT.forEach((text, index) => {
      if (text.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'about',
          index,
          text,
          elementId: 'about',
        });
      }
    });

    // Search in FAQ
    {/*
    faqData.forEach((faq, index) => {
      if (faq.question.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'faq-question',
          index,
          text: faq.question,
          elementId: `faq-${index}`,
        });
      }
      if (faq.answer.toLowerCase().includes(lowerQuery)) {
        results.push({
          type: 'faq-answer',
          index,
          text: faq.answer,
          elementId: `faq-${index}`,
        });
      }
    });
    */}

    setSearchResults(results);
  }, [searchQuery, setSearchResults]);

  // Scroll to current result
  useEffect(() => {
    if (searchResults.length === 0) return;

    const currentResult = searchResults[currentResultIndex];
    if (currentResult && currentResult.elementId) {
      const element = document.getElementById(currentResult.elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentResultIndex, searchResults]);

  return (
    <div>
      {/*hero_jdw*/}
      <section id="#" className="h-screen flex flex-col justify-center items-center p-4 pt-16 md:pb-8 md:pt-32 bg-[var(--primary-cream)] bg-[url('/assets/bg_jdw.jpg')] bg-cover bg-center ">
        {/* Bottom Left: content */}
        <div className="max-w-[70vw] md:max-w-[50vw] lg:max-w-[30vw] text-[var(--primary-cream)] flex flex-col items-center justify-center gap-40 md:gap-20">
          <img
            src="/assets/jdw_hor_oranges.png"
            alt="Jakal Design Week Logo"
            className="w-[100%] h-auto object-contain mb-4 block"
          />
          <img
            src="/assets/jdw_square_oranges.png"
            alt="Jakal Design Week"
            className="w-[60%] md:w-[40%] h-auto object-contain block"
          />
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="pt-6 min-h-screen md:pt-4 md:px-0 lg:pt-6 xl:pt-12 transition-colors duration-[1500ms] md:bg-[var(--primary-orange)] md:h-screen flex flex-col justify-between overflow-hidden"
        style={{ backgroundColor: isMobile ? (isAboutWhite ? '#f58132' : '#faf5de') : undefined }}
      >
        <div className='px-4 grid grid-cols-1 gap-4 md:gap-4 lg:gap-6 xl:gap-10 md:grid-cols-2 pb-3 md:pb-3 lg:pb-4 xl:pb-8 md:px-8'>
          <p id="about-text-0" className="text-justify mb-0 text-base md:text-sm lg:text-sm xl:text-lg leading-relaxed md:leading-relaxed lg:leading-loose font-normal text-[var(--primary-cream)] indent-8 md:indent-8 lg:indent-10 xl:indent-12">
            <HighlightedText
              text="Jakal Design Week (JDW) adalah sebuah perjalanan kreatif di sepanjang Jalan Kaliurang, tempat di mana intelektualitas dan kreativitas berkelindan. JDW ingin turut berkontribusi dalam memperkuat ekosistem kreatif yang lebih terhubung, lebih luas jangkauannya, dan berkembang melalui berbagai inisiatif publik untuk mengakses informasi, dan mengalami peristiwa budaya secara langsung."
              query={searchQuery}
              isActive={searchResults[currentResultIndex]?.type === 'about' && searchResults[currentResultIndex]?.index === 0}
            />
          </p>
          <p id="about-text-1" className="text-justify mb-0 text-base md:text-sm lg:text-sm xl:text-lg leading-relaxed md:leading-relaxed lg:leading-loose font-normal text-[var(--primary-cream)] indent-8 md:indent-8 lg:indent-10 xl:indent-12">
            <HighlightedText
              text=""
              query={searchQuery}
              isActive={searchResults[currentResultIndex]?.type === 'about' && searchResults[currentResultIndex]?.index === 1}
            />
          </p>
        </div>
        <div className='px-4 grid grid-cols-1 gap-4 md:gap-4 lg:gap-6 xl:gap-10 md:grid-cols-2 pb-3 md:pb-3 lg:pb-4 xl:pb-8 md:px-8'>
          <p id="about-text-2" className="text-justify mb-0 text-base md:text-sm lg:text-sm xl:text-lg leading-relaxed md:leading-relaxed lg:leading-loose font-normal text-[var(--primary-cream)] indent-8 md:indent-8 lg:indent-10 xl:indent-12">
            <HighlightedText
              text=""
              query={searchQuery}
              isActive={searchResults[currentResultIndex]?.type === 'about' && searchResults[currentResultIndex]?.index === 1}
            />
          </p>
          <p id="about-text-3" className="text-justify mb-0 text-base md:text-sm lg:text-sm xl:text-lg leading-relaxed md:leading-relaxed lg:leading-loose font-normal text-[var(--primary-cream)] indent-8 md:indent-8 lg:indent-10 xl:indent-12">
            <HighlightedText
              text="Lebih jauh JDW ingin meneguhkan Jalan Kaliurang sebagai koridor kreatif yang bergairah dan berkelanjutan. Melalui kolaborasi antar ruang dan komunitas, mulai dari ruang akademik, galeri seni, kedai kopi, toko buku, dan ruang-ruang kreatif lain, menghadirkan berbagai kegiatan mulai dari ekshibisi, diskusi, pementasan, lokakarya dan lain-lain. JDW ingin turut berkontribusi dalam memperkuat ekosistem kreatif yang lebih terhubung, lebih luas jangkauannya, dan berkembang melalui berbagai inisiatif."
              query={searchQuery}
              isActive={searchResults[currentResultIndex]?.type === 'about' && searchResults[currentResultIndex]?.index === 1}
            />
          </p>
        </div>

        <ZebraCrossSequence mode="scroll" className='h-full md:h-[10vh] lg:h-[20vh] overflow-hidden flex items-center justify-center bg-[var(--primary-cream)]' />
      </section>

      {/* Stakeholders */}
      <div className='px-4 text-center py-3 md:py-6 bg-[var(--primary-cream)]'>
        <h2 className="uppercase mb-4 md:mb-6 lg:mb-8 xl:mb-12 font-normal text-2xl md:text-lg lg:text-2xl text-[var(--primary-orange)]">Initiators</h2>
        <div className="flex justify-center items-center gap-8 md:gap-10 lg:gap-16 xl:gap-24 flex-wrap">
          <a href="https://www.instagram.com/gik.ugm/" target="_blank" rel="noopener noreferrer" className="flex">
            <img src="/assets/stakeholders/gik.png" alt="GIK" className="h-[25px] md:h-[28px] lg:h-[35px] xl:h-[40px] object-contain" />
          </a>
          <a href="https://pulangkeuttara.com/" target="_blank" rel="noopener noreferrer" className="flex">
            <img src="/assets/stakeholders/pulang.png" alt="Pulang" className="h-[18px] md:h-[20px] lg:h-[26px] xl:h-[30px] object-contain" />
          </a>
          <a href="https://www.instagram.com/bukuakik/" target="_blank" rel="noopener noreferrer" className="flex">
            <img src="/assets/stakeholders/akik.png" alt="Buku Akik" className="h-[25px] md:h-[28px] lg:h-[35px] xl:h-[40px] object-contain" />
          </a>
          <a href="https://www.instagram.com/gik.ugm/" target="_blank" rel="noopener noreferrer" className="flex">
            <img src="/assets/stakeholders/agny.png" alt="Agny" className="h-[18px] md:h-[20px] lg:h-[26px] xl:h-[30px] object-contain" />
          </a>
          <a href="https://www.instagram.com/gik.ugm/" target="_blank" rel="noopener noreferrer" className="flex">
            <img src="/assets/stakeholders/dewandaru.png" alt="Dewandaru" className="h-[12px] md:h-[14px] lg:h-[17px] xl:h-[20px] object-contain" />
          </a>
        </div>
      </div>

      {/* Programs Section */}
      < section
        ref={programsRef}
        id="programs"
        className="py-6 min-h-screen flex flex-col justify-center transition-colors duration-[1500ms] p-0 md:py-16 md:block md:h-auto md:min-h-screen md:bg-[var(--primary-cream)]"
        style={{ backgroundColor: isMobile ? (isProgramsDark ? '#000' : '#faf5de') : undefined }
        }
      >
        <ProgramsCarousel programs={PROGRAMS_DATA} isDark={isProgramsDark} />
      </section >


      {/* FAQs Section */}
      {/*
      < section
        id="faqs"
        ref={faqRef}
        className="px-8 py-12 transition-colors duration-[1500ms] md:bg-[var(--primary-cream)] md:h-screen md:flex md:items-center md:justify-center"
        style={{ backgroundColor: isMobile ? (isFAQWhite ? '#faf5de' : '#000') : undefined }}
      >
        <FAQ />
      </section >
      */}
    </div >
  );
}
