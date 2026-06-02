// components/ProductItem.jsx
// Displays a single product card with image, title, price, and Add to Cart

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import PropTypes from 'prop-types';
import './ProductItem.css';

// Helper to render star rating
const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="stars" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>
          {i < full ? '★' : i === full && half ? '⯨' : '☆'}
        </span>
      ))}
      <span className="rating-number">{rating.toFixed(1)}</span>
    </span>
  );
};

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigating to detail page
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      category: product.category,
    }));
    // Show brief "Added!" feedback
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="product-card fade-in">
      <Link to={`/product/${product.id}`} className="product-card-link">
        {/* Product image with lazy loading */}
        <div className="product-image-wrap">
          {!imgError ? (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="product-image-placeholder">
              <span>🛍️</span>
            </div>
          )}
          {/* Category badge */}
          <span className="product-category-badge">{product.category}</span>
        </div>

        {/* Product info */}
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          {product.rating && <StarRating rating={product.rating} />}
          <div className="product-footer">
            <span className="product-price">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <button
        className={`btn product-add-btn ${added ? 'added' : ''}`}
        onClick={handleAddToCart}
        aria-label={`Add ${product.title} to cart`}
      >
        {added ? (
          <>
            <span>✓</span> Added!
          </>
        ) : (
          <>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Add to Cart
          </>
        )}
      </button>
    </article>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    rating: PropTypes.number,
  }).isRequired,
};

export default ProductItem;
