// pages/ProductList.jsx
// Home page — fetches products via custom hook and renders the grid

import { lazy, Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useProducts from '../hooks/useProducts';
import { selectSearchQuery } from '../redux/searchSlice';
import './ProductList.css';

const ProductItem = lazy(() => import('../components/ProductItem'));

const ListLoader = () => (
  <div className="spinner-wrap" role="status" aria-live="polite">
    <div className="spinner" aria-hidden="true" />
    <span>Loading products…</span>
  </div>
);

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const searchQuery = useSelector(selectSearchQuery);

  // Filter products by search query (client-side filtering)
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const q = searchQuery.toLowerCase();
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q))
    );
  }, [products, searchQuery]);

  // Loading state
  if (loading) {
    return (
      <div className="spinner-wrap" role="status" aria-live="polite">
        <div className="spinner" aria-hidden="true" />
        <span>Loading products…</span>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon">⚠️</span>
        <h2>Couldn't load products</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main className="page product-list-page">
      <div className="container">
        {/* Page heading */}
        <header className="product-list-header">
          {searchQuery ? (
            <>
              <h1 className="section-title">
                Results for "{searchQuery}"
              </h1>
              <p className="section-subtitle">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </>
          ) : (
            <>
              <h1 className="section-title">Our Collection</h1>
              <p className="section-subtitle">
                Discover {products.length}+ curated products from around the globe
              </p>
            </>
          )}
        </header>

        {/* No results */}
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <span className="empty-state-icon">🔍</span>
            <h2>No products found</h2>
            <p>Try a different search term or browse our full collection.</p>
          </div>
        ) : (
          /* Product grid */
          <div className="product-grid">
            <Suspense fallback={<ListLoader />}>
              {filteredProducts.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </Suspense>
          </div>
        )}
      </div>
    </main>
  );
};

export default ProductList;
