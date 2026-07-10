'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslations } from 'next-intl';
import { SearchIconButton } from './SearchIconButton';
import { SearchInput } from './SearchInput';

export function SearchOverlay() {
  const t = useTranslations('search');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <SearchIconButton onClick={() => setIsOpen(true)} />

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-32 px-4"
            role="presentation"
          >
            <div
              className="absolute inset-0 bg-mocha/40 backdrop-blur-md transition-opacity duration-300"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            <div
              ref={containerRef}
              role="dialog"
              aria-modal="true"
              aria-label={t('ariaLabel')}
              className="relative z-10 w-full max-w-lg animate-in fade-in zoom-in-95 duration-200"
            >
              <SearchInput onClose={() => setIsOpen(false)} />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
