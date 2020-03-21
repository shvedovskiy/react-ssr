import React from 'react';
import { Link } from 'react-router-dom';

export const Nav = () => (
  <nav className="nav">
    <Link to="/">Home</Link>
    <Link to="/data">Data</Link>
  </nav>
);
