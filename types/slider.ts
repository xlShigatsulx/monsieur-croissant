export interface Slide {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
  ctaUrl: string;
  price: string;
}

export type NavigationDirection = 'next' | 'prev';
