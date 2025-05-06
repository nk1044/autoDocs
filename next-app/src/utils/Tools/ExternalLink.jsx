import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';

function ExternalLink({ title = 'Link', link = '#' }) {
  const [showPreview, setShowPreview] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const linkRef = useRef(null);
  const previewRef = useRef(null);
  const timerRef = useRef(null);

  // Calculate preview position based on viewport
  useEffect(() => {
    if (showPreview && linkRef.current) {
      const rect = linkRef.current.getBoundingClientRect();
      const previewWidth = 320;
      const previewHeight = 200;
      
      // Center the preview horizontally with the link
      let xPos = rect.left + (rect.width / 2) - (previewWidth / 2);
      
      // Make sure it doesn't go off screen
      if (xPos < 10) xPos = 10;
      if (xPos + previewWidth > window.innerWidth - 10) {
        xPos = window.innerWidth - previewWidth - 10;
      }
      
      // Show preview below or above depending on available space
      const isOffScreenBottom = rect.bottom + previewHeight + 10 > window.innerHeight;
      const yPos = isOffScreenBottom ? 
        rect.top - previewHeight - 10 : 
        rect.bottom + 10;
      
      setPosition({ x: xPos, y: yPos });
    }
  }, [showPreview]);

  // Handle mouse events with delay
  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => {
      setShowPreview(true);
    }, 500); // 500ms delay before showing preview
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
    setShowPreview(false);
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  // Handle clicks outside to dismiss preview
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (previewRef.current && !previewRef.current.contains(event.target) &&
          !linkRef.current.contains(event.target)) {
        setShowPreview(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Format the URL for display
  const displayUrl = () => {
    try {
      const url = new URL(link);
      return url.hostname;
    } catch (e) {
      return link;
    }
  };

  // Get website icon/favicon
  const getFaviconUrl = () => {
    try {
      const url = new URL(link);
      return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=64`;
    } catch (e) {
      return null;
    }
  };

  return (
    <span className="relative inline-block">
      <a
        ref={linkRef}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 hover:underline hover:text-blue-300 transition inline-flex items-center gap-1 group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {title}
        <ExternalLinkIcon size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
      </a>

      {showPreview && (
        <div 
          ref={previewRef}
          className="fixed z-50 w-80 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl overflow-hidden transition-opacity duration-300"
          style={{ 
            left: `${position.x}px`, 
            top: `${position.y}px`,
            opacity: previewLoaded ? 1 : 0.9,
            pointerEvents: 'none'
          }}
          onMouseEnter={() => setShowPreview(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Preview header */}
          <div className="flex items-center gap-2 p-3 border-b border-gray-800 bg-gray-950">
            {getFaviconUrl() && (
              <img 
                src={getFaviconUrl()} 
                alt="Site icon" 
                className="w-4 h-4"
                onError={(e) => e.target.style.display = 'none'}
              />
            )}
            <span className="text-gray-300 text-sm font-medium truncate">
              {displayUrl()}
            </span>
          </div>
          
          {/* Preview content - using static image instead of iframe */}
          <div className="relative bg-gray-800 h-40 flex items-center justify-center">
            {/* Loading skeleton */}
            {!previewLoaded && (
              <div className="absolute inset-0 bg-gray-800 flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-600 border-t-blue-400 rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Preview image using API */}
            <img
              src={`https://api.microlink.io/?url=${encodeURIComponent(link)}&screenshot&embed=screenshot.url&meta=false&overlay.browser=dark`}
              alt={`Preview of ${title}`}
              className="w-full h-full object-cover"
              onLoad={() => setPreviewLoaded(true)}
              onError={() => {
                // Fallback if microlink doesn't work
                setPreviewLoaded(true);
              }}
            />
            
            {/* Simple text fallback if image fails */}
            {previewLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80">
                <span className="text-sm text-gray-300">Visit {displayUrl()}</span>
              </div>
            )}
          </div>
          
          {/* Preview footer */}
          <div className="flex justify-between items-center p-2 bg-gray-950 text-xs text-gray-400">
            <span className="truncate">{title}</span>
            <span>Preview</span>
          </div>
        </div>
      )}
    </span>
  );
}

export default ExternalLink;