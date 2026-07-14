interface BestsellerProduct {
  id: string;
  handle: string;
  title: string;
  availableForSale: boolean;
  images?: { edges: { node: { url: string; altText?: string | null } }[] };
  variants?: {
    edges: {
      node: { id: string; price: { amount: string; currencyCode: string } };
    }[];
  };
}

export type { BestsellerProduct };
