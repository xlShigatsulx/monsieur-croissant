import { useTranslations } from 'next-intl';

function IconProps() {
  return {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 26,
    height: 26,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
}

function FreshIcon() {
  return (
    <svg {...IconProps()}>
      <path d="M12 3c2 2.5 4 5.2 4 8a4 4 0 0 1-8 0c0-2.8 2-5.5 4-8Z" />
      <path d="M12 15v6" />
      <path d="M9 21h6" />
    </svg>
  );
}

function HandmadeIcon() {
  return (
    <svg {...IconProps()}>
      <path d="M7 11V6a2 2 0 1 1 4 0v5" />
      <path d="M11 10.5V4.5a2 2 0 1 1 4 0v6" />
      <path d="M15 10.5v-3a2 2 0 1 1 4 0V14a7 7 0 0 1-7 7h-1a7 7 0 0 1-6.29-3.94L3 13.5c-.5-1 .1-2.2 1.2-2.4.7-.1 1.4.2 1.8.8L7 13.5" />
    </svg>
  );
}

function IngredientsIcon() {
  return (
    <svg {...IconProps()}>
      <path d="M20.5 5.5c0 5-4 9-9 9s-9-4-9-9c5 0 9 4 9 9" />
      <path d="M3 3s2 6 8 8" />
    </svg>
  );
}

function DeliveryIcon() {
  return (
    <svg {...IconProps()}>
      <rect x="2" y="7" width="13" height="10" rx="1.5" />
      <path d="M15 10h3.2a1.5 1.5 0 0 1 1.24.66L21 13.5V17h-3" />
      <circle cx="7" cy="18.5" r="1.5" />
      <circle cx="17" cy="18.5" r="1.5" />
    </svg>
  );
}

const ITEMS = [
  { key: 'fresh', Icon: FreshIcon },
  { key: 'handmade', Icon: HandmadeIcon },
  { key: 'ingredients', Icon: IngredientsIcon },
  { key: 'delivery', Icon: DeliveryIcon },
] as const;

export function USPStrip() {
  const t = useTranslations('home.usp');

  return (
    <section className="max-w-6xl mx-auto px-4 py-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {ITEMS.map(({ key, Icon }) => (
          <div
            key={key}
            className="flex flex-col items-center text-center gap-3 px-2"
          >
            <div
              className="w-12 h-12 flex items-center justify-center rounded-full
              bg-caramel/8 text-caramel"
            >
              <Icon />
            </div>
            <div>
              <p className="font-cormorant italic text-mocha text-lg leading-tight mb-1">
                {t(`${key}.title`)}
              </p>
              <p className="text-mocha/55 text-xs leading-relaxed">
                {t(`${key}.description`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
