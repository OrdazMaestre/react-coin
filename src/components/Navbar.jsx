// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-logo">
          Crypto Tracker
        </NavLink>

        <div className="navbar-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Home
          </NavLink>
          <NavLink 
            to="/favorites" 
            className={({ isActive }) => isActive ? 'active' : ''}
          >
            Favoritos
          </NavLink>
        </div>
      </div>
    </nav>
  );
}