import { SocialIcons } from '../../ui/SocialIcons';
import { NavLogo } from '../Navigation/NavLogo';

interface FooterBrandProps {
  description?: string;
}

export function FooterBrand({ description }: FooterBrandProps) {
  return (
    <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-5">
      <NavLogo />

      {description && (
        <p className="text-sm leading-relaxed text-mocha/55 max-w-[240px]">
          {description}
        </p>
      )}

      <div className="flex items-center gap-3">
        <SocialIcons />
      </div>
    </div>
  );
}
