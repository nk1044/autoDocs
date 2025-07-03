import React, { useEffect, useState, useRef } from 'react';
import { Search, Moon, Sun, Menu, FileText, Hash, Code } from 'lucide-react';
import { useRouter } from 'next/router';

function Header({ sidebarOpen, setSidebarOpen }) {
  const router = useRouter();
  const [dark, setDark] = useState(true);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef(null);
  const searchResultsRef = useRef(null);

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
    if (!search.trim()) {
      setSearchResults([]);
      setShowResults(false);
      setSearchError(null);
      return;
    }

    const timer = setTimeout(() => {
      fetchSearchResults(search);
    }, 300); // Reduced debounce time for better UX

    return () => clearTimeout(timer);
  }, [search]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!showResults) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        const result = searchResults[selectedIndex];
        if (result) {
          handleResultClick(result.fullPath);
        }
      } else if (e.key === 'Escape') {
        setShowResults(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showResults, searchResults, selectedIndex]);

  // Global search shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchSearchResults = async (keyword) => {
    setSearchLoading(true);
    setSearchError(null);
    
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(keyword)}&limit=8`
      );
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data = await response.json();
      setSearchResults(data.results || []);
      setShowResults(true);
      setSelectedIndex(-1);
    } catch (error) {
      console.error('Search error:', error);
      setSearchError('Search failed. Please try again.');
      setSearchResults([]);
      setShowResults(true);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleResultClick = (fullPath) => {
    const path = fullPath;
    router.push(`/docs/${path}`);
    setShowResults(false);
    setSearch('');
    setSelectedIndex(-1);
  };

  const handleSearchFocus = () => {
    if (search.trim() && searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding results to allow for clicks
    setTimeout(() => {
      setShowResults(false);
      setSelectedIndex(-1);
    }, 200);
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'md':
        return <FileText size={16} />;
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return <Code size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const highlightText = (text, highlights) => {
    if (!highlights || highlights.length === 0) return text;
    
    // Return the highlighted HTML directly
    return (
      <span 
        dangerouslySetInnerHTML={{ __html: highlights[0] }}
      />
    );
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
            ref={searchInputRef}
            type="text"
            placeholder="Search documentation... (⌘K)"
            value={search}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            className="w-full dark:bg-black bg-[#f2e7dc] dark:text-neutral-200 text-[#3b2e26] pl-10 pr-4 py-2 rounded-3xl border dark:border-neutral-800 border-[#d4c2b2] focus:outline-none focus:ring-2 dark:focus:ring-black dark:placeholder-neutral-500 placeholder-[#6d5444] text-sm transition-all"
          />
          
          {/* Search Results Dropdown */}
          {showResults && (
            <div 
              ref={searchResultsRef}
              className="absolute z-50 w-full bg-white dark:bg-neutral-800 shadow-lg rounded-xl mt-2 border dark:border-neutral-700 border-[#d4c2b2] overflow-hidden max-h-96 overflow-y-auto"
            >
              {searchLoading ? (
                <div className="px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                  Searching...
                </div>
              ) : searchError ? (
                <div className="px-4 py-3 text-sm text-red-600 dark:text-red-400">
                  {searchError}
                </div>
              ) : searchResults.length === 0 ? (
                <div className="px-4 py-3 text-sm text-neutral-500 dark:text-neutral-400">
                  No results found for "{search}".
                </div>
              ) : (
                <>
                  {searchResults.map((result, index) => (
                    <div
                      key={result.id}
                      onClick={() => handleResultClick(result.fullPath)}
                      className={`cursor-pointer px-4 py-3 transition-colors duration-200 ${
                        index === selectedIndex
                          ? 'bg-[#f5f2ee] dark:bg-neutral-700'
                          : 'hover:bg-[#f5f2ee] dark:hover:bg-neutral-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1 dark:text-neutral-400 text-[#6d5444]">
                          {getFileIcon(result.fileType)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium dark:text-white text-[#3b2e26] truncate">
                            {result.fileName}
                          </div>
                          <div className="text-xs text-neutral-500 dark:text-neutral-400 truncate mb-1">
                            {result.fullPath}
                          </div>
                          
                          {/* Show highlighted content */}
                          {result.highlights.headings && (
                            <div className="text-sm text-neutral-700 dark:text-neutral-300 mb-1">
                              <strong>Heading: </strong>
                              {highlightText('', result.highlights.headings)}
                            </div>
                          )}
                          
                          {result.highlights.content && (
                            <div className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                              {highlightText('', result.highlights.content)}
                            </div>
                          )}
                          
                          {!result.highlights.content && !result.highlights.headings && (
                            <div className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                              {result.contentPreview}
                            </div>
                          )}
                          
                          {/* Tags */}
                          {result.tags && result.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {result.tags.slice(0, 3).map(tag => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-0.5 rounded"
                                >
                                  <Hash size={10} />
                                  {tag}
                                </span>
                              ))}
                              {result.tags.length > 3 && (
                                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                  +{result.tags.length - 3} more
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Footer with navigation hints */}
                  <div className="px-4 py-2 border-t dark:border-neutral-700 border-[#d4c2b2] bg-neutral-50 dark:bg-neutral-900 text-xs text-neutral-500 dark:text-neutral-400 flex justify-between items-center">
                    <span>{searchResults.length} results</span>
                    <div className="flex gap-3">
                      <span>↑↓ Navigate</span>
                      <span>↵ Select</span>
                      <span>ESC Close</span>
                    </div>
                  </div>
                </>
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