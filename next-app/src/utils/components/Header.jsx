import React, { useEffect, useState } from 'react';
import { Search, Moon, Sun, Menu } from 'lucide-react';
import { useRouter } from 'next/router';
import axios from 'axios';

function Header({ sidebarOpen, setSidebarOpen }) {
  const router = useRouter();
  const [dark, setDark] = useState(true);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  // Debounced search effect
  useEffect(() => {
    if (!search) return;

    const timer = setTimeout(() => {
      fetchData(search);
    }, 2000);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchData = async (keyword) => {
    setSearchLoading(true);
    try {
      const response = await axios.post('/api/search', { keyword });
      setSearchResults(response.data.matches);
      setSearchError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSearchError('Failed to fetch search results');
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleResultClick = (uniqueKey) => {
    router.push(`/docs/${uniqueKey}`);
  };

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  return (
    <div className="w-full pt-2 mb-2">
      <div className="flex items-center justify-between dark:bg-neutral-900 bg-[#e3d5c4] border dark:border-black border-[#bcae9e] rounded-2xl px-4 py-3 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl">

        {/* Left: Logo and Menu */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden dark:text-neutral-300 text-[#3b2e26] hover:text-[#b25c2a] transition-colors duration-200"
          >
            <Menu size={22} />
          </button>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => router.push('/docs')}
          >
            <svg className="w-8 h-8 dark:text-white text-[#3b2e26]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            <h1 className="text-2xl font-semibold dark:text-white text-[#3b2e26] tracking-tight pt-1">DocsWrite</h1>
          </div>
        </div>

        {/* Middle: Search */}
        <div className="relative w-full max-w-lg mx-4 hidden sm:block">
          <span className="absolute inset-y-0 left-3 flex items-center dark:text-neutral-400 text-[#3b2e26]">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Search documentation..."
            value={search}
            onChange={handleSearchChange}
            className="w-full dark:bg-black bg-[#f2e7dc] dark:text-neutral-200 text-[#3b2e26] pl-10 pr-4 py-2 rounded-3xl border dark:border-neutral-800 border-[#d4c2b2] focus:outline-none focus:ring-2 dark:focus:ring-black dark:placeholder-neutral-500 placeholder-[#6d5444] text-sm transition-all"
          />
          {/* Search Results Dropdown */}
          {(search || searchError) && (
            <div className="absolute z-10 w-full bg-white dark:bg-neutral-800 shadow-lg rounded-xl mt-2 border dark:border-neutral-700 border-[#d4c2b2] overflow-hidden">
              {searchLoading ? (
                <div className="px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400">
                  Searching...
                </div>
              ) : searchError ? (
                <div className="px-4 py-3 text-sm text-red-600 dark:text-red-400">
                  {searchError}
                </div>
              ) : searchResults.length === 0 ? (
                <div className="px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400">
                  No results found.
                </div>
              ) : (
                searchResults.map((result) => (
                  <div
                    key={result.uniqueKey}
                    onClick={() => handleResultClick(result.uniqueKey)}
                    className="cursor-pointer px-4 py-2 hover:bg-[#f5f2ee] dark:hover:bg-neutral-700 transition-colors duration-200"
                  >
                    <div className="font-medium dark:text-white text-[#3b2e26]">
                      {result.name}
                    </div>
                    {result.snippet && (
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        {result.snippet}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/nk1044/autoDocs"
            target="_blank"
            rel="noopener noreferrer"
            className="dark:text-neutral-300 text-[#3b2e26] hover:text-[#b25c2a] transition-colors"
          >
            <svg className="w-5 h-5 dark:text-white text-[#3b2e26]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.793-.26.793-.577v-2.233c-3.338.726-4.033-1.416-4.033-1.416-.547-1.387-1.334-1.756-1.334-1.756-1.089-.745.083-.729.083-.729 1.205.083 1.839 1.236 1.839 1.236 1.07 1.834 2.808 1.304 3.493.997.106-.774.418-1.304.762-1.603C6.23 16.69 3.428 15.66 3.428 11.07c0-1.311.47-2.381 1.236-3.221-.124-.304-.535-1.524.118-3.176 0 0 1.007-.322 3.3 1.23a11.6 11.6 0 013.002-.404c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.243 2.873.118 3.176.77.84 1.236 1.91 1.236 3.221 0 4.609-2.807 5.624-5.478 5.921.43.372.823 1.102.823 2.222v3.293c0 .318.192.693.801.576C20.563 21.8 24 17.302 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="text-[#3b2e26] dark:text-neutral-300 hover:text-[#b25c2a] transition-colors"
          >
            {dark ? <Sun size={20} className='dark:text-white text-[#3b2e26]' /> : <Moon className='dark:text-white text-[#3b2e26]' size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
