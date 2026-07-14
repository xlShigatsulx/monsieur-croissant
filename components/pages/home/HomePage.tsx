import { ContactTeaser } from './ContactTeaser';
import { AboutTeaser } from './AboutTeaser';
import { BestsellersSection } from './BestsellersSection/BestsellersSection';
import { CategoriesSection } from './CategoriesSection';
import { HeroSection } from './HeroSection';
import { USPStrip } from './USPStrip';
import { SeasonalSlider } from '@/components/slider/SeasonalSlider';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <SeasonalSlider />
      <USPStrip />
      <CategoriesSection />
      <BestsellersSection />
      <AboutTeaser />
      <ContactTeaser />
    </div>
  );
}
