import React, { useState } from 'react';
import { Search, Moon, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [dark, setDark] = useState(true);
  const navigate = useNavigate();

  return (
    <div className='w-full pt-2'>
      <div className='flex flex-row items-center justify-between w-full bg-neutral-800 p-3 rounded-lg border-b border-neutral-700 shadow-sm'>

        {/* Logo */}
        <div className='flex flex-row items-center cursor-pointer space-x-1 ml-3'
        onClick={() => navigate('/')}
        >
          <svg className="w-7 h-7 sm:w-9 sm:h-9 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
          <h1 className='text-2xl pt-2 font-bold text-white'>autoDocs</h1>
        </div>

        {/* Search Bar */}
        <div className='relative w-full max-w-md mx-4'>
          <span className='absolute inset-y-0 left-3 flex items-center text-neutral-400'>
            <Search className="w-5 h-5" />
          </span>
          <input
            type="text"
            className='w-full pl-10 pr-4 py-2 bg-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-700 transition-all duration-150'
            placeholder='Search documentation...'
          />
        </div>

        {/* Icons Section */}
        <div className='flex items-center space-x-1 mr-3'>

          {/* GitHub Icon */}
          <a
            href="https://github.com/nk1044/autoDocs" // replace with your URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          {/* Dark Mode Toggle Icon */}
          <button
            onClick={() => setDark(!dark)}
            className="text-white hover:text-gray-300 cursor-pointer transition-colors"
          >
            {dark ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>

        </div>
      </div>
    </div>
  );
}

export default Header;
