'use client';

import { useCallback, useRef } from 'react';
import { useSlider } from '@/hooks/useSlider';
import { SliderTrack } from './SliderTrack';
import { SliderArrows } from './SliderArrows';
import { SliderDots } from './SliderDots';
import type { NavigationDirection } from '@/types/slider';
import { SliderCta } from './SliderCta';
import { SliderSkeleton } from './SliderSkeleton';
import { useSwipe } from '@/hooks/useSwipe';
import { useSliderData } from '@/hooks/useSliderData';
import { useInViewport } from '@/hooks/useInViewport';

function ProductSlider() {
  const { slides, loading, error } = useSliderData();
  const sliderRef = useRef<HTMLDivElement>(null);
  const isInView = useInViewport(sliderRef);

  const { current, trackIndex, isAnimated, navigate, goTo, resetAutoplay } =
    useSlider({ totalLength: slides.length, autoplayEnabled: isInView });

  const handleNavigate = useCallback(
    (dir: NavigationDirection) => {
      navigate(dir);
      resetAutoplay();
    },
    [navigate, resetAutoplay],
  );

  const handleDotSelect = useCallback(
    (index: number) => {
      goTo(index);
      resetAutoplay();
    },
    [goTo, resetAutoplay],
  );

  useSwipe(sliderRef, handleNavigate);

  if (loading) return <SliderSkeleton />;

  if (error || slides.length === 0) return null;

  return (
    <div className="w-full max-w-3xl">
      <div
        ref={sliderRef}
        className="relative rounded-2xl overflow-hidden select-none"
        style={{
          boxShadow:
            '0 32px 64px -12px rgba(58,35,24,0.25), 0 0 0 1px rgba(196,151,122,0.12)',
        }}
      >
        <div className="relative aspect-4/3 sm:aspect-video overflow-hidden bg-sand">
          <SliderTrack
            slides={slides}
            trackIndex={trackIndex}
            isAnimated={isAnimated}
          />
          <SliderArrows onNavigate={handleNavigate} />
        </div>
      </div>

      <SliderDots
        slides={slides}
        current={current}
        onSelect={handleDotSelect}
      />

      <SliderCta productLink={slides[current]?.ctaUrl} />
    </div>
  );
}

export default ProductSlider;
