export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  description: string;
  weightGrams?: number;
  category: string;
  badge?: string;
}

export const CATEGORIES = [
  { id: 'hair-care', name: 'Hair Care', icon: '💆‍♀️', image: 'https://picsum.photos/seed/cathair/300/300' },
  { id: 'skin-care', name: 'Skin Care', icon: '✨', image: 'https://picsum.photos/seed/catskin/300/300' },
  { id: 'combos', name: 'Combos', icon: '🎁', image: 'https://picsum.photos/seed/catcombo/300/300' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Brahmi & Amla Growth Elixir',
    price: 599,
    salePrice: 449,
    image: 'https://picsum.photos/seed/product1/600/800',
    description: 'Stimulates follicles and promotes thicker, longer hair.',
    weightGrams: 150,
    category: 'hair-care',
    badge: 'Bestseller',
  },
  {
    id: 'p2',
    name: 'Bhringraj Scalp Therapy',
    price: 699,
    salePrice: 529,
    image: 'https://picsum.photos/seed/product2/600/800',
    description: 'Deeply nourishes the scalp to prevent dandruff and hair fall.',
    weightGrams: 200,
    category: 'hair-care',
  },
  {
    id: 'p3',
    name: 'Hibiscus Daily Shine Oil',
    price: 499,
    salePrice: 379,
    image: 'https://picsum.photos/seed/product3/600/800',
    description: 'A lightweight formula for everyday gloss and frizz control.',
    weightGrams: 100,
    category: 'hair-care',
    badge: 'New',
  },
  {
    id: 'p4',
    name: 'Argan & Rosemary Repair Blend',
    price: 799,
    salePrice: 599,
    image: 'https://picsum.photos/seed/product4/600/800',
    description: 'Intense repair for chemically treated or damaged hair.',
    weightGrams: 150,
    category: 'hair-care',
  },
  {
    id: 'p5',
    name: 'Neem & Tulsi Detoxifying Seroil',
    price: 549,
    salePrice: 419,
    image: 'https://picsum.photos/seed/product5/600/800',
    description: 'Purifies the scalp and clears buildup for healthier roots.',
    weightGrams: 120,
    category: 'skin-care',
    badge: 'Bestseller',
  },
  {
    id: 'p6',
    name: 'Shikakai & Coconut Hydration',
    price: 449,
    salePrice: 349,
    image: 'https://picsum.photos/seed/product6/600/800',
    description: 'Deep moisture lock for dry, brittle, and sun-damaged strands.',
    weightGrams: 200,
    category: 'body-care',
  },
  {
    id: 'p7',
    name: 'Onion Seed & Fenugreek Booster',
    price: 649,
    salePrice: 489,
    image: 'https://picsum.photos/seed/product7/600/800',
    description: 'Targets thinning hair and strengthens from root to tip.',
    weightGrams: 150,
    category: 'hair-care',
    badge: 'New',
  },
  {
    id: 'p8',
    name: 'Castor & Almond Leave-In Serum',
    price: 749,
    salePrice: 559,
    image: 'https://picsum.photos/seed/product8/600/800',
    description: 'Smooths cuticles and adds instant silky protection.',
    weightGrams: 100,
    category: 'skin-care',
  },
];
