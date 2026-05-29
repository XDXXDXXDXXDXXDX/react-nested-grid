import type { NestedGridNode } from 'react-nested-grid'

export interface ProductData {
  tag?: string
  featured?: boolean
}

export const nodes: NestedGridNode<ProductData>[] = [
  {
    id: 'root',
    columns: 8,
    children: [
      {
        id: 'mens',
        title: "Men's Collection",
        columns: 3,
        span: 7,
        children: [
          {
            id: 'tops',
            title: 'Tops',
            columns: 2,
            span: 2,
            children: [
              {
                id: 'shirts',
                title: 'Shirts',
                children: [
                  {
                    id: 'oxford',
                    title: 'Oxford Shirt',
                    content: 'Classic-fit, 100% cotton.',
                    data: { tag: 'Best Seller' },
                  },
                  {
                    id: 'linen',
                    title: 'Linen Shirt',
                    content: 'Relaxed-fit, breathable linen.',
                    data: { tag: 'New' },
                  },
                ],
              },
              {
                id: 'outerwear',
                title: 'Outerwear',
                children: [
                  {
                    id: 'bomber',
                    title: 'Bomber Jacket',
                    content: 'Lightweight nylon, ribbed trim.',
                    data: { featured: true },
                  },
                  {
                    id: 'trench',
                    title: 'Trench Coat',
                    content: 'Water-resistant cotton gabardine.',
                    data: { tag: 'Sale' },
                  },
                ],
              },
            ],
          },
          {
            id: 'accessories',
            title: 'Accessories',
            children: [
              {
                id: 'belt',
                title: 'Leather Belt',
                content: 'Full-grain Italian leather.',
                data: { tag: 'New' },
              },
              {
                id: 'watch',
                title: 'Chronograph Watch',
                content: 'Sapphire crystal, 42mm case.',
                data: { featured: true },
              },
            ],
          },
        ],
      },
      {
        id: 'highlights',
        title: 'Highlights',
        rowSpan: 3,
        children: [
          { id: 'bestseller', title: 'Best Sellers' },
          { id: 'new', title: 'New Arrivals' },
          { id: 'sale', title: 'On Sale' },
          { id: 'featured', title: 'Featured' },
        ],
      },
      {
        id: 'womens',
        title: "Women's Collection",
        columns: 2,
        span: 7,
        children: [
          {
            id: 'dresses',
            title: 'Dresses',
            children: [
              {
                id: 'midi',
                title: 'Midi Dress',
                content: 'A-line silhouette, floral print.',
                data: { tag: 'Best Seller' },
              },
              { id: 'maxi', title: 'Maxi Dress', content: 'Flowy rayon, adjustable waist.' },
              {
                id: 'wrap',
                title: 'Wrap Dress',
                content: 'Stretch jersey, true to size.',
                data: { tag: 'Sale' },
              },
            ],
          },
          {
            id: 'bags',
            title: 'Bags',
            children: [
              {
                id: 'tote',
                title: 'Canvas Tote',
                content: 'Reinforced handles, interior pocket.',
                data: { featured: true },
              },
              {
                id: 'crossbody',
                title: 'Crossbody Bag',
                content: 'Adjustable strap, pebbled leather.',
                data: { tag: 'New' },
              },
            ],
          },
        ],
      },
      {
        id: 'kids',
        title: "Kids' Collection",
        columns: 6,
        span: 7,
        children: [
          {
            id: 'onesie',
            title: 'Cotton Onesie',
            content: 'Soft, breathable fabric.',
            data: { tag: 'Best Seller' },
            span: 2,
          },
          {
            id: 'romper',
            title: 'Denim Romper',
            content: 'Durable denim, adjustable straps.',
            span: 2,
          },
          {
            id: 'sneakers',
            title: 'Kids Sneakers',
            content: 'Velcro straps, non-slip sole.',
            span: 2,
          },
          {
            id: 'backpack',
            title: 'Mini Backpack',
            content: 'Lightweight, multi compartments.',
            span: 3,
          },
          {
            id: 'sweater',
            title: 'Knit Sweater',
            content: 'Cozy acrylic blend, ribbed cuffs.',
            span: 3,
          },
        ],
      },
    ],
  },
]

export const tagColors: Record<string, { bg: string; text: string }> = {
  'Best Seller': { bg: '#fef3c7', text: '#92400e' },
  New: { bg: '#dbeafe', text: '#1e40af' },
  Sale: { bg: '#fce7f3', text: '#9d174d' },
}
