// pages/Checkout.jsx
// Checkout form — collects user info, shows order summary, places order

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { selectCartItems, selectCartTotal, clearCart } from '../redux/cartSlice';
import './Checkout.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  // Form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Empty cart redirect
  if (items.length === 0 && !orderPlaced) {
    return (
      <main className="page">
        <div className="container">
          <div className="empty-state">
            <span className="empty-state-icon">🛒</span>
            <h2>Nothing to checkout</h2>
            <p>Your cart is empty. Add some products first!</p>
            <Link to="/" className="btn btn-primary">Go Shopping</Link>
          </div>
        </div>
      </main>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Basic validation
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = 'A valid email is required.';
    if (!form.address.trim()) newErrors.address = 'Address is required.';
    if (!form.city.trim()) newErrors.city = 'City is required.';
    if (!form.zip.trim()) newErrors.zip = 'ZIP code is required.';
    if (!form.cardName.trim()) newErrors.cardName = 'Name on card is required.';
    if (!form.cardNumber.trim() || form.cardNumber.replace(/\s/g, '').length < 16)
      newErrors.cardNumber = 'Enter a valid 16-digit card number.';
    if (!form.expiry.trim()) newErrors.expiry = 'Expiry date is required.';
    if (!form.cvv.trim() || form.cvv.length < 3)
      newErrors.cvv = 'Enter a valid CVV.';
    return newErrors;
  };

  const handlePlaceOrder = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    // Simulate async order processing
    setTimeout(() => {
      setOrderPlaced(true);
      dispatch(clearCart());
      setSubmitting(false);

      // Auto-redirect to home after 4 seconds
      setTimeout(() => navigate('/'), 4000);
    }, 1200);
  };

  const isFreeShipping = total >= 50;
  const tax = total * 0.08;
  const orderTotal = total + (isFreeShipping ? 0 : 4.99) + tax;

  // ---- Order placed success screen ----
  if (orderPlaced) {
    return (
      <main className="page">
        <div className="container">
          <div className="order-success fade-in">
            <div className="order-success-icon">✓</div>
            <h1>Order Placed!</h1>
            <p>
              Thank you, <strong>{form.name}</strong>! Your order has been confirmed.
              A receipt will be sent to <strong>{form.email}</strong>.
            </p>
            <p className="redirect-notice">Redirecting you to the home page in a few seconds…</p>
            <Link to="/" className="btn btn-accent">Back to Shop</Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page checkout-page">
      <div className="container">
        <h1 className="section-title">Checkout</h1>
        <p className="section-subtitle">Complete your order below</p>

        <div className="checkout-layout">
          {/* ---- Form ---- */}
          <section className="checkout-form-section">
            {/* Shipping info */}
            <div className="form-block">
              <h2 className="form-block-title">Shipping Information</h2>

              <div className="form-grid">
                <div className="field full">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name" name="name" type="text"
                    placeholder="Jane Doe"
                    value={form.name} onChange={handleChange}
                    className={errors.name ? 'input-error' : ''}
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>

                <div className="field full">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email" name="email" type="email"
                    placeholder="jane@example.com"
                    value={form.email} onChange={handleChange}
                    className={errors.email ? 'input-error' : ''}
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>

                <div className="field full">
                  <label htmlFor="address">Street Address</label>
                  <input
                    id="address" name="address" type="text"
                    placeholder="123 Main Street"
                    value={form.address} onChange={handleChange}
                    className={errors.address ? 'input-error' : ''}
                  />
                  {errors.address && <span className="field-error">{errors.address}</span>}
                </div>

                <div className="field">
                  <label htmlFor="city">City</label>
                  <input
                    id="city" name="city" type="text"
                    placeholder="New York"
                    value={form.city} onChange={handleChange}
                    className={errors.city ? 'input-error' : ''}
                  />
                  {errors.city && <span className="field-error">{errors.city}</span>}
                </div>

                <div className="field">
                  <label htmlFor="zip">ZIP Code</label>
                  <input
                    id="zip" name="zip" type="text"
                    placeholder="10001"
                    value={form.zip} onChange={handleChange}
                    className={errors.zip ? 'input-error' : ''}
                  />
                  {errors.zip && <span className="field-error">{errors.zip}</span>}
                </div>
              </div>
            </div>

            {/* Payment info */}
            <div className="form-block">
              <h2 className="form-block-title">Payment Details</h2>
              <p className="form-block-note">🔒 This is a demo. Do not enter real card details.</p>

              <div className="form-grid">
                <div className="field full">
                  <label htmlFor="cardName">Name on Card</label>
                  <input
                    id="cardName" name="cardName" type="text"
                    placeholder="Jane Doe"
                    value={form.cardName} onChange={handleChange}
                    className={errors.cardName ? 'input-error' : ''}
                  />
                  {errors.cardName && <span className="field-error">{errors.cardName}</span>}
                </div>

                <div className="field full">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    id="cardNumber" name="cardNumber" type="text"
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    value={form.cardNumber}
                    onChange={(e) => {
                      // Auto-format with spaces
                      const val = e.target.value.replace(/\D/g, '').substring(0, 16);
                      const formatted = val.replace(/(.{4})/g, '$1 ').trim();
                      setForm((p) => ({ ...p, cardNumber: formatted }));
                      if (errors.cardNumber) setErrors((p) => ({ ...p, cardNumber: '' }));
                    }}
                    className={errors.cardNumber ? 'input-error' : ''}
                  />
                  {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
                </div>

                <div className="field">
                  <label htmlFor="expiry">Expiry Date</label>
                  <input
                    id="expiry" name="expiry" type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={form.expiry}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
                      if (val.length >= 3) val = val.slice(0, 2) + '/' + val.slice(2);
                      setForm((p) => ({ ...p, expiry: val }));
                      if (errors.expiry) setErrors((p) => ({ ...p, expiry: '' }));
                    }}
                    className={errors.expiry ? 'input-error' : ''}
                  />
                  {errors.expiry && <span className="field-error">{errors.expiry}</span>}
                </div>

                <div className="field">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    id="cvv" name="cvv" type="text"
                    placeholder="123"
                    maxLength={4}
                    value={form.cvv}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '').substring(0, 4);
                      setForm((p) => ({ ...p, cvv: val }));
                      if (errors.cvv) setErrors((p) => ({ ...p, cvv: '' }));
                    }}
                    className={errors.cvv ? 'input-error' : ''}
                  />
                  {errors.cvv && <span className="field-error">{errors.cvv}</span>}
                </div>
              </div>
            </div>
          </section>

          {/* ---- Order Summary ---- */}
          <aside className="checkout-summary">
            <h2 className="summary-title">Order Summary</h2>

            {/* Item list */}
            <div className="checkout-items">
              {items.map((item) => (
                <div key={item.id} className="checkout-item">
                  <div className="checkout-item-image">
                    <img src={item.thumbnail} alt={item.title} loading="lazy" />
                    <span className="checkout-item-qty">{item.quantity}</span>
                  </div>
                  <span className="checkout-item-name">{item.title}</span>
                  <span className="checkout-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
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
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="summary-total">
              <span>Order Total</span>
              <span>${orderTotal.toFixed(2)}</span>
            </div>

            {/* Place Order */}
            <button
              className="btn btn-accent place-order-btn"
              onClick={handlePlaceOrder}
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <span className="btn-spinner" aria-hidden="true" />
                  Processing…
                </>
              ) : (
                'Place Order →'
              )}
            </button>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
