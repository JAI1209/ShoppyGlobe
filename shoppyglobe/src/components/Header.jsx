// components/Header.jsx
// Site header with logo, navigation, search bar, and cart icon

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartCount } from '../redux/cartSlice';
import { setSearchQuery, selectSearchQuery, clearSearch } from '../redux/searchSlice';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartCount = useSelector(selectCartCount);
  const searchQuery = useSelector(selectSearchQuery);
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle search input and navigate to home to show filtered results
  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
    if (window.location.pathname !== '/') navigate('/');
  };

  const handleClearSearch = () => {
    dispatch(clearSearch());
  };

  return (
    <header className="header">
      <div className="container header-inner">
        {/* Logo */}
        <Link to="/" className="header-logo" onClick={handleClearSearch}>
          <span className="logo-icon">✦</span>
          <span className="logo-text">ShoppyGlobe</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav" aria-label="Main navigation">
          <Link to="/" className="nav-link" onClick={handleClearSearch}>Home</Link>
          <Link to="/cart" className="nav-link">Cart</Link>
          <Link to="/checkout" className="nav-link">Checkout</Link>
        </nav>

        {/* Search Bar */}
        <div className="header-search">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search products…"
            value={searchQuery}
            onChange={handleSearch}
            aria-label="Search products"
          />
          {searchQuery && (
            <button
              className="search-clear"
              onClick={handleClearSearch}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>

        {/* Cart Icon */}
        <Link to="/cart" className="cart-btn" aria-label={`Cart, ${cartCount} items`}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>

        {/* Mobile Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${menuOpen ? 'open' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <div className="container">
            <div className="mobile-search">
              <span className="search-icon" aria-hidden="true">⌕</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search products…"
                value={searchQuery}
                onChange={handleSearch}
                aria-label="Search products"
              />
            </div>
            <nav className="mobile-nav">
              <Link to="/" className="mobile-nav-link" onClick={() => { setMenuOpen(false); handleClearSearch(); }}>Home</Link>
              <Link to="/cart" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Cart {cartCount > 0 && `(${cartCount})`}</Link>
              <Link to="/checkout" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Checkout</Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
