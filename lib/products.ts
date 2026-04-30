export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Brahmi & Amla Growth Elixir',
    price: 45.00,
    image: 'https://picsum.photos/seed/product1/600/800',
    description: 'Stimulates follicles and promotes thicker, longer hair.',
  },
  {
    id: 'p2',
    name: 'Bhringraj Scalp Therapy',
    price: 52.00,
    image: 'https://picsum.photos/seed/product2/600/800',
    description: 'Deeply nourishes the scalp to prevent dandruff and hair fall.',
  },
  {
    id: 'p3',
    name: 'Hibiscus Daily Shine Oil',
    price: 38.00,
    image: 'https://picsum.photos/seed/product3/600/800',
    description: 'A lightweight formula for everyday gloss and frizz control.',
  },
  {
    id: 'p4',
    name: 'Argan & Rosemary Repair Blend',
    price: 60.00,
    image: 'https://picsum.photos/seed/product4/600/800',
    description: 'Intense repair for chemically treated or damaged hair.',
  },
  {
    id: 'p5',
    name: 'Neem & Tulsi Detoxifying Seroil',
    price: 42.00,
    image: 'https://picsum.photos/seed/product5/600/800',
    description: 'Purifies the scalp and clears buildup for healthier roots.',
  },
  {
    id: 'p6',
    name: 'Shikakai & Coconut Hydration',
    price: 35.00,
    image: 'https://picsum.photos/seed/product6/600/800',
    description: 'Deep moisture lock for dry, brittle, and sun-damaged strands.',
  },
  {
    id: 'p7',
    name: 'Onion Seed & Fenugreek Booster',
    price: 48.00,
    image: 'https://picsum.photos/seed/product7/600/800',
    description: 'Targets thinning hair and strengthens from root to tip.',
  },
  {
    id: 'p8',
    name: 'Castor & Almond Leave-In Serum',
    price: 55.00,
    image: 'https://picsum.photos/seed/product8/600/800',
    description: 'Smooths cuticles and adds instant silky protection.',
  }
];
