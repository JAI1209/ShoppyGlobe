// pages/Cart.jsx
// Full cart page — lists items, shows totals, links to checkout

import { lazy, Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotal } from '../redux/cartSlice';
import './Cart.css';

const CartItem = lazy(() => import('../components/CartItem'));

const CartLoader = () => (
  <div className="spinner-wrap" role="status" aria-live="polite">
    <div className="spinner" aria-hidden="true" />
    <span>Loading cart items…</span>
  </div>
);

const Cart = () => {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  // Empty cart state
  if (items.length === 0) {
    return (
      <main className="page">
        <div className="container">
          <div className="empty-state">
            <span className="empty-state-icon">🛒</span>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet. Explore our collection!</p>
            <Link to="/" className="btn btn-primary">Start Shopping</Link>
          </div>
        </div>
      </main>
    );
  }

  const shippingThreshold = 50;
  const isFreeShipping = total >= shippingThreshold;
  const remaining = shippingThreshold - total;

  return (
    <main className="page cart-page">
      <div className="container">
        <h1 className="section-title">Shopping Cart</h1>
        <p className="section-subtitle">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>

        {/* Free shipping progress */}
        {!isFreeShipping && (
          <div className="shipping-nudge">
            <div className="shipping-nudge-bar">
              <div
                className="shipping-nudge-fill"
                style={{ width: `${(total / shippingThreshold) * 100}%` }}
              />
            </div>
            <p>
              Add <strong>${remaining.toFixed(2)}</strong> more for free shipping! 🎉
            </p>
          </div>
        )}
        {isFreeShipping && (
          <div className="shipping-success">
            🎉 You qualify for <strong>free shipping</strong>!
          </div>
        )}

        <div className="cart-layout">
          {/* Cart Items */}
          <section className="cart-items-list" aria-label="Cart items">
            <Suspense fallback={<CartLoader />}>
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </Suspense>
          </section>

          {/* Order Summary */}
          <aside className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className={isFreeShipping ? 'free-label' : ''}>
                  {isFreeShipping ? 'FREE' : '$4.99'}
                </span>
              </div>
              <div className="summary-row">
                <span>Tax (8%)</span>
                <span>${(total * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>${(total + (isFreeShipping ? 0 : 4.99) + total * 0.08).toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="btn btn-accent checkout-btn">
              Proceed to Checkout →
            </Link>

            <Link to="/" className="btn btn-ghost continue-btn">
              ← Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Cart;
