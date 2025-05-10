import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink as ExternalLinkIcon } from 'lucide-react';

function ExternalLink({
  title = 'Link',
  link = '#',
  width = 200,
  height = 125,
  quality = 50,
  isStatic = false,
  imageSrc = ''
}) {
  const [showPreview, setShowPreview] = useState(false);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const linkRef = useRef(null);
  const previewRef = useRef(null);
  const timerRef = useRef(null);

  // Calculate Microlink preview image URL
  const buildPreviewSrc = () => {
    if (isStatic) return imageSrc;
    const params = new URLSearchParams({
      url: link,
      screenshot: 'true',
      meta: 'false',
      embed: 'screenshot.url',
      colorScheme: 'dark',
      'viewport.isMobile': 'true',
      'viewport.deviceScaleFactor': '1',
      'viewport.width': width * 3,
      'viewport.height': height * 3,
    });
    return `https://api.microlink.io/?${params.toString()}`;
  };

  // Get domain display
  const displayUrl = () => {
    try {
      const url = new URL(link);
      return url.hostname;
    } catch {
      return link;
    }
  };

  // Get favicon
  const getFaviconUrl = () => {
    try {
      const url = new URL(link);
      return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=64`;
    } catch {
      return null;
    }
  };

  // Update preview position
  useEffect(() => {
    if (showPreview && linkRef.current) {
      const rect = linkRef.current.getBoundingClientRect();
      const previewWidth = width + 40;
      const previewHeight = height + 80;

      let xPos = rect.left + (rect.width / 2) - (previewWidth / 2);
      xPos = Math.max(10, Math.min(xPos, window.innerWidth - previewWidth - 10));

      const isOffScreenBottom = rect.bottom + previewHeight + 10 > window.innerHeight;
      const yPos = isOffScreenBottom ? rect.top - previewHeight - 10 : rect.bottom + 10;

      setPosition({ x: xPos, y: yPos });
    }
  }, [showPreview, width, height]);

  // Hover handlers
  const handleMouseEnter = () => {
    timerRef.current = setTimeout(() => setShowPreview(true), 400);
  };

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current);
    setShowPreview(false);
    setPreviewLoaded(false);
  };

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        previewRef.current &&
        !previewRef.current.contains(e.target) &&
        !linkRef.current.contains(e.target)
      ) {
        setShowPreview(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          className="fixed z-50 w-[220px] bg-gray-900 border border-gray-700 rounded-xl shadow-xl overflow-hidden"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            pointerEvents: 'none',
          }}
          onMouseEnter={() => setShowPreview(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Header */}
          <div className="flex items-center gap-2 p-2 border-b border-gray-800 bg-gray-950">
            {getFaviconUrl() && (
              <img
                src={getFaviconUrl()}
                alt="Favicon"
                className="w-4 h-4"
                onError={(e) => (e.target.style.display = 'none')}
              />
            )}
            <span className="text-gray-300 text-sm font-medium truncate">
              {displayUrl()}
            </span>
          </div>

          {/* Preview image */}
          <div className="relative bg-gray-800" style={{ height }}>
            {!previewLoaded && (
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-gray-600 border-t-blue-400 rounded-full animate-spin"></div>
              </div>
            )}
            <img
              src={buildPreviewSrc()}
              width={width}
              height={height}
              alt={`Preview of ${title}`}
              className="w-full h-full object-cover"
              onLoad={() => setPreviewLoaded(true)}
              onError={() => setPreviewLoaded(true)}
            />
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center px-2 py-1 bg-gray-950 text-xs text-gray-400">
            <span className="truncate">{title}</span>
            <span>Preview</span>
          </div>
        </div>
      )}
    </span>
  );
}

export default ExternalLink;
