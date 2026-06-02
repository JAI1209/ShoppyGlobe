// pages/NotFound.jsx
// 404 page shown for unmatched routes

import { Link, useLocation } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const location = useLocation();

  return (
    <main className="page notfound-page">
      <div className="container">
        <div className="notfound-content fade-in">
          <div className="notfound-number" aria-hidden="true">404</div>
          <h1>Page Not Found</h1>
          <p>
            No page found at <code>{location.pathname}</code>.
            Looks like this page wandered off somewhere in the globe.
          </p>
          <div className="notfound-actions">
            <Link to="/" className="btn btn-primary">Go Home</Link>
            <Link to="/cart" className="btn btn-outline">View Cart</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;