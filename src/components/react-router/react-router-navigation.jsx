import React from 'react';
import { Link } from 'react-router-dom';

export const ReactRouterNavigation = () => (
  <nav className="nav">
    <Link to="/" className="nav__link">
      Home
    </Link>
    <Link to="/counter" className="nav__link">
      Counter
    </Link>
    <Link to="/data" className="nav__link">
      Data
    </Link>
  </nav>
);
