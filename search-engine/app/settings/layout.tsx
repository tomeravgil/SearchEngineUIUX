"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import logo from "../rpi_logo_white.png";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const handleRPIClick = () => {
    router.push('/');
  };

  const handleSectionClick = (section: string) => {
    router.push(`/settings${section}`);
  };

  return (
    <div className="min-h-screen bg-muted text-muted-foreground">
      <div className="flex h-screen">
        <aside className="w-80 bg-primaryRed flex-shrink-0 shadow-lg">
          <div className="flex flex-col h-full">
            <div 
              className="p-6 m-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow border border-red-900"
              onClick={handleRPIClick}
            >
              <Image
                src={logo}
                alt="RPI Logo"
                className="w-full h-auto"
                priority
              />
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 px-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleSectionClick('')}
                    className={`w-full text-left px-4 py-3 rounded-lg text-white transition-colors duration-200
                      ${pathname === '/settings' 
                        ? 'bg-red-800' 
                        : 'hover:bg-red-800/70'}`}
                  >
                    General Settings
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionClick('/search-preferences')}
                    className={`w-full text-left px-4 py-3 rounded-lg text-white transition-colors duration-200
                      ${pathname === '/settings/search-preferences' 
                        ? 'bg-red-800' 
                        : 'hover:bg-red-800/70'}`}
                  >
                    Search Preferences
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleSectionClick('/browsing-history')}
                    className={`w-full text-left px-4 py-3 rounded-lg text-white transition-colors duration-200
                      ${pathname === '/settings/browsing-history' 
                        ? 'bg-red-800' 
                        : 'hover:bg-red-800/70'}`}
                  >
                    Browsing History and Settings
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-8 py-6">
            <h2 className="text-2xl font-bold mb-8">
              {pathname === '/settings' && 'General Settings'}
              {pathname === '/settings/search-preferences' && 'Search Preferences'}
              {pathname === '/settings/browsing-history' && 'Browsing History and Settings'}
            </h2>
            <div className="space-y-6">
              {children}
            </div>
          </div>
        </main>

        {/* Mobile Menu Button - Only visible on small screens */}
        <button 
          className="lg:hidden fixed top-4 left-4 p-2 rounded-lg bg-primaryRed text-white"
          onClick={() => document.getElementById('my-drawer')?.click()}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="w-6 h-6"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
}