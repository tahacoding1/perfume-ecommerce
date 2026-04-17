import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, MessageSquare, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer animate-fade-up">
      <div className="footer-top container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">LU<span>M</span>IÈRE</Link>
          <p>
            Experience the art of fine fragrance. 
            Crafted with the rarest ingredients for the modern connoisseur.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Website"><Globe size={18} /></a>
            <a href="#" aria-label="Mail"><Mail size={18} /></a>
            <a href="#" aria-label="Message"><MessageSquare size={18} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/store">Our Collections</Link></li>
            <li><Link to="/about">Our Story</Link></li>
            <li><Link to="/store/signature">Signature Scents</Link></li>
            <li><Link to="/store/giftbox">Gift Sets</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Customer Care</h4>
          <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/track-order">Track Your Order</Link></li>
            <li><Link to="/policy/shipping">Shipping Policy</Link></li>
            <li><Link to="/policy/terms">Terms of Service</Link></li>
            <li><Link to="/policy/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-col footer-newsletter">
          <h4>Join the Club</h4>
          <p>Subscribe for exclusive access to limited editions and private sales.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your Email Address" required />
            <button type="submit" aria-label="Subscribe"><Mail size={16} /></button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} LUMIÈRE. All rights reserved.</p>
        <p>Crafted for elegance.</p>
      </div>
    </footer>
  );
};

export default Footer;
