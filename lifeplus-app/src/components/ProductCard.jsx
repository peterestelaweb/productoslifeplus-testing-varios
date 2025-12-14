import React from 'react';
import { ShoppingCart } from 'lucide-react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = '/images/product-placeholder.jpg'; // Asegúrate de que existe o usa una url remota
          }}
        />
      </div>

      <div className="product-header">
        <span className="product-code">{product.id.split('-').pop()}</span>
        <div className="product-prices">
          <span className="product-card-price">€{product.price}</span>
        </div>
      </div>

      <h3 className="product-name">{product.name}</h3>
      <p className="product-format">{product.description}</p>

      <button
        onClick={() => window.open(product.originalLink, '_blank')}
        className="product-link"
      >
        <ShoppingCart size={16} />
        <span>Comprar en Tienda</span>
      </button>
    </div>
  );
};

export default ProductCard;