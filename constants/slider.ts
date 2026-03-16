import type { Slide } from '@/types/slider'

export const SLIDES: Slide[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1200&q=85',
    name: 'Шоколадний Оксамит',
    description: 'Бельгійський темний шоколад, ганаш, малинове кулі',
    price: 'від 1 200 ₴',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=1200&q=85',
    name: 'Полунична Мрія',
    description: 'Ванільний бісквіт, крем-чіз, свіжа полуниця',
    price: 'від 980 ₴',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200&q=85',
    name: 'Лимонна Лазур',
    description: 'Лимонний курд, меренга, зефірні квіти',
    price: 'від 1 050 ₴',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1200&q=85',
    name: 'Карамельна Ніжність',
    description: 'Солона карамель, пекан, мусовий крем',
    price: 'від 1 150 ₴',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=1200&q=85',
    name: 'Троянда Парижа',
    description: 'Личі, малина, троянкова вода, ніжний мус',
    price: 'від 1 350 ₴',
  },
]

export const SLIDER_CONFIG = {
  transitionMs: 650,
  autoplayMs: 4500,
} as const
