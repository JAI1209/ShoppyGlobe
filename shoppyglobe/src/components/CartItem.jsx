// components/CartItem.jsx
// Represents a single product in the cart with quantity controls

import { useDispatch } from 'react-redux';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '../redux/cartSlice';
import './CartItem.css';
import PropTypes from 'prop-types';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="cart-item fade-in">
      {/* Product thumbnail */}
      <div className="cart-item-image-wrap">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="cart-item-image"
          loading="lazy"
        />
      </div>

      {/* Product details */}
      <div className="cart-item-details">
        <span className="cart-item-category">{item.category}</span>
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-unit-price">${item.price.toFixed(2)} each</p>
      </div>

      {/* Controls */}
      <div className="cart-item-controls">
        {/* Quantity adjuster */}
        <div className="quantity-control">
          <button
            className="qty-btn"
            onClick={() => dispatch(decrementQuantity(item.id))}
            aria-label="Decrease quantity"
            disabled={item.quantity <= 1}
          >
            −
          </button>
          <span className="qty-value" aria-live="polite">{item.quantity}</span>
          <button
            className="qty-btn"
            onClick={() => dispatch(incrementQuantity(item.id))}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Subtotal */}
        <span className="cart-item-subtotal">
          ${(item.price * item.quantity).toFixed(2)}
        </span>

        {/* Remove */}
        <button
          className="btn btn-danger cart-item-remove"
          onClick={() => dispatch(removeFromCart(item.id))}
          aria-label={`Remove ${item.title} from cart`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
          </svg>
          Remove
        </button>
      </div>
    </div>
  );
};


CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};
export default CartItem;
