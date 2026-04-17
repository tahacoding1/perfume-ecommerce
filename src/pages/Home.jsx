import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ChevronDown, ChevronUp, Star, ArrowRight } from 'lucide-react';
import './Home.css';

const MOCK_FEATURED = [
  { id: 1, name: 'Oud Mystique', type: 'OUD', price: 8500, rating: 5, image: 'https://images.unsplash.com/photo-1590156546946-cb55d8d2315b?auto=format&fit=crop&q=80&w=400' },
  { id: 2, name: 'Sandalwood Rose', type: 'ATTAR', price: 3200, rating: 4.8, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400' },
  { id: 3, name: 'Midnight Bloom', type: 'SIGNATURE', price: 12000, rating: 4.9, image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=400' },
  { id: 4, name: 'Citrus Breeze', type: 'UNDER 1500RS', price: 1400, rating: 4.5, image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=400' },
];

const REVIEWS = [
  { id: 1, text: "The lasting power of their signature collection is unbelievable. Pure luxury.", author: "Ayesha K.", role: "Verified Buyer" },
  { id: 2, text: "Finally found my perfect everyday scent without breaking the bank.", author: "Ali M.", role: "Verified Buyer" },
  { id: 3, text: "Their oud is authentic and rich, exactly what I was looking for.", author: "Zainab T.", role: "Verified Buyer" },
  { id: 4, text: "Beautiful packaging and incredible fragrances. The perfect gift.", author: "Hassan R.", role: "Verified Buyer" }
];

const FAQS = [
  { question: "How long do your perfumes last?", answer: "Our signature and oud collections are formulated as Extrait de Parfum and last anywhere from 12-24 hours on skin, and even longer on clothes." },
  { question: "Are your ingredients cruelty-free?", answer: "Yes, all our ingredients are ethically sourced and 100% cruelty-free. We do not test on animals." },
  { question: "What is your return policy?", answer: "We offer a 7-day return policy for sealed, unopened products. Please note that tester boxes are final sale." },
  { question: "Do you offer international shipping?", answer: "Currently, we only ship nationwide within Pakistan, but we are expanding internationally soon!" }
];

const Home = () => {
  const { addToCart } = useCart();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content animate-fade-up">
          <span className="hero-tagline">Haute Parfumerie</span>
          <h1 className="hero-title">The Art of<br/><em>Scent</em></h1>
          <p className="hero-desc">Rare ingredients. Timeless compositions.<br/>Crafted for those who live with intention.</p>
          <div className="hero-actions">
            <Link to="/store" className="btn btn-primary">Explore Collection</Link>
            <Link to="/about" className="btn btn-outline">Our Story</Link>
          </div>
        </div>
        <div className="hero-visual animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <img 
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800" 
            alt="Luxury Perfume" 
            className="hero-img"
          />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          <span>Oud</span><span className="dot">•</span>
          <span>Attar</span><span className="dot">•</span>
          <span>Signature</span><span className="dot">•</span>
          <span>Loyalty</span><span className="dot">•</span>
          <span>Gift Sets</span><span className="dot">•</span>
          <span>Oud</span><span className="dot">•</span>
          <span>Attar</span><span className="dot">•</span>
          <span>Signature</span><span className="dot">•</span>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <section className="section container">
        <div className="section-header">
          <div>
            <span className="section-label">Curated Selection</span>
            <h2 className="section-title">Featured <em>Masterpieces</em></h2>
          </div>
          <Link to="/store" className="view-all">View All <ArrowRight size={16} /></Link>
        </div>

        <div className="product-grid">
          {MOCK_FEATURED.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-img">
                <span className="product-badge">{product.type}</span>
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <span className="type">{product.type}</span>
                <div className="product-meta">
                  <span className="price">Rs. {product.price.toLocaleString()}</span>
                  <div className="rating">
                    <Star size={14} fill="currentColor" />
                    <span>{product.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES / COLLECTIONS */}
      <section className="section container categories-section">
        <h2 className="section-title text-center mb-5">Shop by <em>Category</em></h2>
        <div className="categories-grid">
          <Link to="/store/oud" className="cat-card cat-large">
            <img src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80&w=800" alt="Oud" />
            <div className="cat-info">
              <h3>Majestic Oud</h3>
              <span>Explore &rarr;</span>
            </div>
          </Link>
          <div className="cat-column">
            <Link to="/store/attar" className="cat-card">
              <img src="https://images.unsplash.com/photo-1595532542520-21a473f32420?auto=format&fit=crop&q=80&w=400" alt="Attar" />
              <div className="cat-info">
                <h3>Pure Attar</h3>
              </div>
            </Link>
            <Link to="/store/under1500" className="cat-card">
              <img src="https://images.unsplash.com/photo-1605369680376-795a973a4b95?auto=format&fit=crop&q=80&w=400" alt="Under 1500" />
              <div className="cat-info">
                <h3>Under Rs. 1500</h3>
              </div>
            </Link>
          </div>
          <div className="cat-column">
            <Link to="/store/giftbox" className="cat-card">
              <img src="https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=400" alt="Gift Box" />
              <div className="cat-info">
                <h3>Gift Boxes</h3>
              </div>
            </Link>
            <Link to="/store/tester" className="cat-card">
              <img src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=400" alt="Tester Boxes" />
              <div className="cat-info">
                <h3>Tester Boxes</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* REVIEWS CAROUSEL */}
      <section className="section reviews-section">
        <div className="container">
          <h2 className="section-title text-center mb-5">Words from <em>Connoisseurs</em></h2>
          <div className="reviews-carousel">
            <div className="reviews-track">
              {/* Double array for infinite scroll effect */}
              {[...REVIEWS, ...REVIEWS].map((review, idx) => (
                <div key={idx} className="review-card">
                  <div className="stars">
                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="review-text">"{review.text}"</p>
                  <div className="review-author">
                    <h4>{review.author}</h4>
                    <span>{review.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="section container faq-section">
        <span className="section-label text-center">Support</span>
        <h2 className="section-title text-center mb-5">Frequently Asked <em>Questions</em></h2>
        
        <div className="faq-list">
          {FAQS.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openFaq === index ? 'open' : ''}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
