import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Moon, Sun, ShoppingBag, Menu, X, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { cartCount, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024 && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            LU<span>M</span>IÈRE
          </Link>

          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/store">Store</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>

          <div className="nav-actions">
            <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle Theme">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <div className="auth-desktop">
              {user ? (
                <div className="profile-dropdown">
                  <Link to="/profile" className="profile-btn">
                    <User size={20} />
                    <span>{user.name.split(' ')[0]}</span>
                  </Link>
                  <div className="dropdown-menu">
                    <Link to="/profile">Settings</Link>
                    <Link to="/order-track">Orders</Link>
                    <button onClick={handleLogout} className="logout-btn-nav" style={{ 
                      background: 'none', border: 'none', padding: '10px 20px', 
                      textAlign: 'left', width: '100%', cursor: 'pointer', 
                      fontFamily: 'inherit', color: 'inherit', fontSize: '13px'
                    }}>
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="auth-links">
                  <Link to="/login" className="login-link">Log In</Link>
                  <Link to="/signup" className="signup-link">Sign Up</Link>
                </div>
              )}
            </div>

            <button onClick={() => setIsCartOpen(true)} className="cart-btn" aria-label="Cart">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>

            <button
              className="mobile-toggle"
              onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <Link to="/">Home</Link>
          <Link to="/store">Store</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <hr />
          {user ? (
            <>
              <Link to="/profile">Profile Settings</Link>
              <Link to="/order-track">Track Order</Link>
            </>
          ) : (
            <>
              <Link to="/login">Log In</Link>
              <Link to="/signup">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
