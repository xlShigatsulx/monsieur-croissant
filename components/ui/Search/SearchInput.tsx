'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useDebounceSearch } from '@/hooks/useDebounceSearch';
import { useClickOutside } from '@/hooks/useClickOutside';
import { SearchResults } from './SearchResults';
import { ClearButton } from '../ClearButton';

interface SearchInputProps {
  onClose?: () => void;
}

export function SearchInput({ onClose }: SearchInputProps) {
  const t = useTranslations('search');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    query,
    isOpen,
    loading,
    products,
    handleChange,
    handleFocus,
    clear,
    close,
  } = useDebounceSearch();

  useClickOutside(containerRef, close);

  const handleClear = () => {
    clear();
    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const handleSelect = () => {
    close();
    onClose?.();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={handleFocus}
        placeholder={t('placeholder')}
        autoFocus
        className="w-full font-jost text-sm border border-mocha/20 rounded-full
          px-5 py-3 pr-11 outline-none focus:border-mocha/40 transition-colors
          bg-cream"
      />

      {query.length > 0 && (
        <ClearButton onClick={handleClear} label={t('clear')} />
      )}

      {isOpen && (
        <SearchResults
          products={products}
          loading={loading}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
}
