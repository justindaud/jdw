import './globals.css';
import type { Metadata, Viewport } from 'next';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import Footer from '../components/Footer';
import { SearchProvider } from '../contexts/SearchContext';

export const metadata: Metadata = {
  title: 'JAKAL DESIGN WEEK',
  description: 'JAKAL DESIGN WEEK',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SearchProvider>
          <LeftSidebar />
          <main className="main-content md:pr-[100px] md:pl-[50px]">
            {children}
            <Footer />
          </main>
          <RightSidebar />
        </SearchProvider>
      </body>
    </html>
  );
}
