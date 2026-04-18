import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';
import './FloatingButtons.css';

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(30);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      const newsletter = document.querySelector('.footer-newsletter');
      if (newsletter && window.innerWidth <= 640) {
        const rect = newsletter.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
          const overlap = window.innerHeight - rect.top;
          setBottomOffset(Math.max(30, overlap + 20));
        } else {
          setBottomOffset(30);
        }
      } else {
        setBottomOffset(30);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/something', '_blank');
  };

  return (
    <div className="floating-container" style={{ bottom: `${bottomOffset}px`, transition: 'bottom 0.1s ease-out' }}>
      <button 
        className={`fab scroll-fab ${isVisible ? 'visible' : ''}`} 
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
      
      <button 
        className="fab wa-fab" 
        onClick={openWhatsApp}
        aria-label="Contact on WhatsApp"
      >
        <MessageCircle size={24} />
      </button>
    </div>
  );
};

export default FloatingButtons;
