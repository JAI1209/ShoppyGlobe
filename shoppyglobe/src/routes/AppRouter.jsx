// routes/AppRouter.jsx
// Defines all application routes using React Router v6 createBrowserRouter
// Implements React.lazy() + Suspense for code splitting on all page components

import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from '../components/Header';

// ---- Lazy-loaded pages (code splitting) ----
const ProductList = lazy(() => import('../pages/ProductList'));
const ProductDetail = lazy(() => import('../pages/ProductDetail'));
const Cart = lazy(() => import('../pages/Cart'));
const Checkout = lazy(() => import('../pages/Checkout'));
const NotFound = lazy(() => import('../pages/NotFound'));

// Loading fallback shown during chunk download
const PageLoader = () => (
  <div className="spinner-wrap" role="status" aria-live="polite">
    <div className="spinner" aria-hidden="true" />
    <span>Loading…</span>
  </div>
);

// Root layout — Header + page outlet
const RootLayout = () => (
  <>
    <Header />
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  </>
);

// Browser router definition
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <ProductList />,
      },
      {
        path: '/product/:id',
        element: <ProductDetail />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
