// hooks/useProducts.js
// Custom hook that fetches and manages product list state

import { useState, useEffect } from 'react';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          'https://dummyjson.com/products?limit=100&select=id,title,price,thumbnail,category,rating,description,images,stock',
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch products (status ${response.status})`);
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        // Ignore abort errors from cleanup
        if (err.name !== 'AbortError') {
          setError(err.message || 'Something went wrong. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Cleanup: cancel in-flight request on unmount
    return () => controller.abort();
  }, []);

  return { products, loading, error };
};

export default useProducts;
