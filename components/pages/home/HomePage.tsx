import ProductSlider from '@/components/slider/ProductSlider';
import { ContactTeaser } from './ContactTeaser';
import { AboutTeaser } from './AboutTeaser';
import { BestsellersSection } from './BestsellersSection';
import { CategoriesSection } from './CategoriesSection';
import { HeroSection } from './HeroSection/HeroSection';
import { USPStrip } from './USPStrip';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <div className="flex flex-col items-center px-4">
        <ProductSlider />
      </div>

      <USPStrip />
      <CategoriesSection />
      <BestsellersSection />
      <AboutTeaser />
      <ContactTeaser />
    </div>
  );
}
