// Mock product data for the QUIRKLO store
export const products = [
  {
    id: '1',
    name: 'Neon Dream Tee',
    price: 39.99,
    image: 'https://images.pexels.com/photos/8484308/pexels-photo-8484308.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Bold neon graphic tee with oversized fit. The statement piece your wardrobe needs.'
  },
  {
    id: '2',
    name: 'Y2K Butterfly Crop Top',
    price: 32.99,
    image: 'https://images.pexels.com/photos/247206/pexels-photo-247206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Y2K-inspired crop top with embroidered butterflies. Major throwback energy.'
  },
  {
    id: '3',
    name: 'Monochrome Cargo Pants',
    price: 59.99,
    image: 'https://images.pexels.com/photos/2260628/pexels-photo-2260628.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Utility-style cargo pants with multiple pockets. Practical but make it fashion.'
  },
  {
    id: '4',
    name: 'Oversized Check Shirt',
    price: 44.99,
    image: 'https://images.pexels.com/photos/769749/pexels-photo-769749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Classic check pattern with a modern oversized fit. Layer up for maximum style points.'
  },
  {
    id: '5',
    name: 'Abstract Print Hoodie',
    price: 65.99,
    image: 'https://images.pexels.com/photos/5368956/pexels-photo-5368956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Vibrant abstract prints on a premium cotton hoodie. Art you can wear.'
  },
  {
    id: '6',
    name: 'Platform Chunky Sneakers',
    price: 79.99,
    image: 'https://images.pexels.com/photos/267242/pexels-photo-267242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Extra height, extra style. These chunky platform sneakers will elevate any outfit.'
  },
  {
    id: '7',
    name: 'Mini Canvas Tote Bag',
    price: 29.99,
    image: 'https://images.pexels.com/photos/1204464/pexels-photo-1204464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Compact canvas tote with quirky graphic print. Small bag, big personality.'
  },
  {
    id: '8',
    name: 'Retro Bucket Hat',
    price: 24.99,
    image: 'https://images.pexels.com/photos/984619/pexels-photo-984619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    description: 'Throwback bucket hat in pastel tones. The perfect finishing touch to any outfit.'
  }
];

export const getProducts = () => {
  return products;
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};