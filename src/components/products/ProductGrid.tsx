import React from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '../../data/products';

const ProductGrid: React.FC = () => {
  const products = getProducts();

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;