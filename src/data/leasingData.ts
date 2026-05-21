export const LEASING_CATEGORIES = ['ALL', 'LUXURY', 'RETAIL & F&B', 'POP-UP & ACTIVATION'] as const;

export type CategoryType = typeof LEASING_CATEGORIES[number];

export interface LeasingSpace {
  id: string;
  name: string;
  category: Exclude<CategoryType, 'ALL'>;
  imagePath: string;
  sqft: string;
  idealFor: string;
  highlights: string[];
  ctaLabel: string;
}

export const LEASING_SPACES: LeasingSpace[] = [
  // LUXURY
  {
    id: 'lux-1',
    name: 'The Grand Atrium',
    category: 'LUXURY',
    imagePath: '/assets/Photorealistic-Renders/6.png',
    sqft: '8,500 sq ft',
    idealFor: 'Flagship Luxury Retailer',
    highlights: [
      'Double-height glass storefront',
      'Prime location on the Luxury Mile',
      'Custom architectural lighting options',
      'Direct valet access'
    ],
    ctaLabel: 'ENQUIRE ABOUT THIS SPACE'
  },
  {
    id: 'lux-2',
    name: 'Corner Jewel Box',
    category: 'LUXURY',
    imagePath: '/assets/Photorealistic-Renders/11.png',
    sqft: '4,200 sq ft',
    idealFor: 'High-end Watches & Jewelry',
    highlights: [
      'Unobstructed corner visibility',
      'Reinforced security infrastructure',
      'Premium marble facade potential'
    ],
    ctaLabel: 'ENQUIRE ABOUT THIS SPACE'
  },
  {
    id: 'lux-3',
    name: 'Avenue Boutique',
    category: 'LUXURY',
    imagePath: '/assets/Photorealistic-Renders/1.png',
    sqft: '6,000 sq ft',
    idealFor: 'Designer Ready-to-Wear',
    highlights: [
      'High foot traffic adjacency',
      'Mezzanine level for VIP service',
      'Pre-installed acoustic treatments'
    ],
    ctaLabel: 'ENQUIRE ABOUT THIS SPACE'
  },

  // RETAIL & F&B
  {
    id: 'fb-1',
    name: 'The Conservatory',
    category: 'RETAIL & F&B',
    imagePath: '/assets/Photorealistic-Renders/4.png',
    sqft: '12,000 sq ft',
    idealFor: 'Signature Fine Dining',
    highlights: [
      'Indoor/outdoor hybrid seating',
      'Fully vetted kitchen venting',
      'Dedicated private dining room'
    ],
    ctaLabel: 'ENQUIRE ABOUT THIS SPACE'
  },
  {
    id: 'fb-2',
    name: 'Market Hall Corner',
    category: 'RETAIL & F&B',
    imagePath: '/assets/Photorealistic-Renders/8.png',
    sqft: '3,800 sq ft',
    idealFor: 'Experiential Cafe / Fast Casual',
    highlights: [
      'High-throughput flow design',
      'Adjacent to major entertainment anchor',
      'Patio seating included'
    ],
    ctaLabel: 'ENQUIRE ABOUT THIS SPACE'
  },
  {
    id: 'fb-3',
    name: 'Culinary Studio',
    category: 'RETAIL & F&B',
    imagePath: '/assets/Photorealistic-Renders/14.png',
    sqft: '5,500 sq ft',
    idealFor: 'Interactive Dining or Tasting Room',
    highlights: [
      'Open kitchen layout',
      'Custom bar build-out ready',
      'Premium air filtration system'
    ],
    ctaLabel: 'ENQUIRE ABOUT THIS SPACE'
  },

  // POP-UP & ACTIVATION
  {
    id: 'pop-1',
    name: 'Center Stage',
    category: 'POP-UP & ACTIVATION',
    imagePath: '/assets/Photorealistic-Renders/12.png',
    sqft: '2,500 sq ft',
    idealFor: 'Brand Launch & Immersive Tech',
    highlights: [
      '360-degree visibility',
      'Heavy duty power access',
      'Flexible rigging points'
    ],
    ctaLabel: 'ENQUIRE ABOUT THIS SPACE'
  },
  {
    id: 'pop-2',
    name: 'The Runway',
    category: 'POP-UP & ACTIVATION',
    imagePath: '/assets/Photorealistic-Renders/13.png',
    sqft: '1,800 sq ft',
    idealFor: 'Limited Edition Retail Drops',
    highlights: [
      'High-energy corridor',
      'Modular wall systems included',
      'Short-term 30-90 day leases'
    ],
    ctaLabel: 'ENQUIRE ABOUT THIS SPACE'
  },
  {
    id: 'pop-3',
    name: 'Innovation Kiosk',
    category: 'POP-UP & ACTIVATION',
    imagePath: '/assets/Photorealistic-Renders/54.jpg',
    sqft: '800 sq ft',
    idealFor: 'Direct-to-Consumer Try-on',
    highlights: [
      'Turnkey setup',
      'Integrated digital signage',
      'Plug-and-play POS network'
    ],
    ctaLabel: 'ENQUIRE ABOUT THIS SPACE'
  }
];
