// pages/ProductDetail.jsx
// Shows full product details — fetched by ID from route params

import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import './ProductDetail.css';

// Star rating component
const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className="stars detail-stars" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>
          {i < full ? '★' : i === full && half ? '⯨' : '☆'}
        </span>
      ))}
      <span className="rating-number">{rating.toFixed(1)} / 5</span>
    </span>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  // Fetch single product by ID
  useEffect(() => {
    const controller = new AbortController();

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`https://dummyjson.com/products/${id}`, {
          signal: controller.signal,
        });

        if (!res.ok) {
          if (res.status === 404) throw new Error('Product not found.');
          throw new Error(`Error loading product (status ${res.status})`);
        }

        const data = await res.json();
        setProduct(data);
        setSelectedImage(0);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    return () => controller.abort();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      category: product.category,
    }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Loading
  if (loading) {
    return (
      <div className="spinner-wrap" role="status">
        <div className="spinner" aria-hidden="true" />
        <span>Loading product…</span>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon">⚠️</span>
        <h2>Oops!</h2>
        <p>{error}</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Back to Shop</button>
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : [product.thumbnail];
  const discountPrice = product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : null;

  return (
    <main className="page detail-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true"> / </span>
          <span>{product.category}</span>
          <span aria-hidden="true"> / </span>
          <span className="breadcrumb-current">{product.title}</span>
        </nav>

        <div className="detail-layout">
          {/* Image Gallery */}
          <section className="detail-gallery">
            <div className="detail-main-image-wrap">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="detail-main-image"
                loading="lazy"
                onError={(e) => { e.target.src = product.thumbnail; }}
              />
              {product.discountPercentage > 0 && (
                <span className="detail-discount-badge">
                  -{Math.round(product.discountPercentage)}%
                </span>
              )}
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="detail-thumbnails" role="list">
                {images.map((img, i) => (
                  <button
                    key={i}
                    role="listitem"
                    className={`detail-thumb ${i === selectedImage ? 'active' : ''}`}
                    onClick={() => setSelectedImage(i)}
                    aria-label={`View image ${i + 1}`}
                    aria-pressed={i === selectedImage}
                  >
                    <img src={img} alt="" loading="lazy"
                      onError={(e) => { e.target.src = product.thumbnail; }} />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Product Info */}
          <section className="detail-info">
            <span className="detail-category">{product.category}</span>
            <h1 className="detail-title">{product.title}</h1>

            {/* Rating */}
            {product.rating && (
              <div className="detail-rating-row">
                <StarRating rating={product.rating} />
                {product.stock && (
                  <span className={`detail-stock ${product.stock > 10 ? 'in-stock' : 'low-stock'}`}>
                    {product.stock > 10 ? '✓ In Stock' : `Only ${product.stock} left`}
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            <div className="detail-price-block">
              {discountPrice ? (
                <>
                  <span className="detail-price-original">${product.price.toFixed(2)}</span>
                  <span className="detail-price">${discountPrice.toFixed(2)}</span>
                </>
              ) : (
                <span className="detail-price">${product.price.toFixed(2)}</span>
              )}
            </div>

            {/* Description */}
            <div className="detail-description">
              <h2>About this product</h2>
              <p>{product.description}</p>
            </div>

            {/* Specs */}
            {product.brand && (
              <div className="detail-specs">
                {product.brand && (
                  <div className="spec-row">
                    <span className="spec-label">Brand</span>
                    <span className="spec-value">{product.brand}</span>
                  </div>
                )}
                {product.sku && (
                  <div className="spec-row">
                    <span className="spec-label">SKU</span>
                    <span className="spec-value">{product.sku}</span>
                  </div>
                )}
                {product.warrantyInformation && (
                  <div className="spec-row">
                    <span className="spec-label">Warranty</span>
                    <span className="spec-value">{product.warrantyInformation}</span>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="detail-actions">
              <button
                className={`btn detail-add-btn ${added ? 'added' : ''}`}
                onClick={handleAddToCart}
              >
                {added ? '✓ Added to Cart!' : 'Add to Cart'}
              </button>
              <Link to="/cart" className="btn btn-outline">View Cart</Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProductDetail;
