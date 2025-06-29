// client/src/components/Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'; // We will create this CSS file next

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <NavLink to="/">ResumeScorer AI</NavLink>
      </div>
      <nav className="main-nav">
        <NavLink to="/">Analyzer</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
};

export default Header;