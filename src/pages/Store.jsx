import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Star, Filter } from 'lucide-react';
import './Store.css';

const ALL_PRODUCTS = [
  { id: 1, name: 'Oud Mystique', type: 'OUD', category: 'oud', price: 8500, rating: 5, image: 'https://images.unsplash.com/photo-1590156546946-cb55d8d2315b?auto=format&fit=crop&q=80&w=400' },
  { id: 2, name: 'Royal Agarwood', type: 'OUD', category: 'oud', price: 10500, rating: 4.9, image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80&w=400' },
  { id: 3, name: 'Sandalwood Rose', type: 'ATTAR', category: 'attar', price: 3200, rating: 4.8, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=400' },
  { id: 4, name: 'Musk Tahara', type: 'ATTAR', category: 'attar', price: 2800, rating: 4.7, image: 'https://images.unsplash.com/photo-1595532542520-21a473f32420?auto=format&fit=crop&q=80&w=400' },
  { id: 5, name: 'Citrus Breeze', type: 'UNDER 1500', category: 'under1500', price: 1400, rating: 4.5, image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=400' },
  { id: 6, name: 'White Linen', type: 'UNDER 1500', category: 'under1500', price: 1200, rating: 4.2, image: 'https://images.unsplash.com/photo-1605369680376-795a973a4b95?auto=format&fit=crop&q=80&w=400' },
  { id: 7, name: 'Midnight Bloom', type: 'SIGNATURE', category: 'signature', price: 12000, rating: 4.9, image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=400' },
  { id: 8, name: 'Amber Wood', type: 'SIGNATURE', category: 'signature', price: 14000, rating: 5.0, image: 'https://images.unsplash.com/photo-1590156546946-cb55d8d2315b?auto=format&fit=crop&q=80&w=400' },
  { id: 9, name: 'Tester Collection', type: 'TESTER BOX', category: 'tester', price: 4000, rating: 4.6, image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=400' },
  { id: 10, name: 'Luxury Gift Set', type: 'GIFT BOX', category: 'giftbox', price: 25000, rating: 5.0, image: 'https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=400' },
  { id: 11, name: 'Loyalty Exclusive', type: 'MAIN LOYALTY', category: 'loyalty', price: 8000, rating: 4.7, image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=400' }
];

const CATEGORIES = [
  { id: 'all', name: 'All Collection' },
  { id: 'oud', name: 'Oud' },
  { id: 'attar', name: 'Attar' },
  { id: 'signature', name: 'Signature' },
  { id: 'under1500', name: 'Under 1500Rs' },
  { id: 'tester', name: 'Tester Box' },
  { id: 'giftbox', name: 'Gift Box' },
  { id: 'loyalty', name: 'Main Loyalty' }
];

const Store = () => {
  const { category } = useParams();
  const { addToCart } = useCart();
  const [activeCat, setActiveCat] = useState('all');
  const [products, setProducts] = useState(ALL_PRODUCTS);

  useEffect(() => {
    window.scrollTo(0, 0);
    const catToSet = category || 'all';
    setActiveCat(catToSet);
    
    if (catToSet === 'all') {
      setProducts(ALL_PRODUCTS);
    } else {
      setProducts(ALL_PRODUCTS.filter(p => p.category === catToSet));
    }
  }, [category]);

  return (
    <div className="store-page page-padding">
      <div className="store-header animate-fade-up">
        <span className="section-label text-center">Collection</span>
        <h1 className="section-title text-center">The <em>Boutique</em></h1>
      </div>

      <div className="store-container container">
        <aside className="store-sidebar">
          <div className="sidebar-header">
            <h3><Filter size={18} /> Categories</h3>
          </div>
          <ul className="category-list">
            {CATEGORIES.map(c => (
              <li key={c.id}>
                <Link 
                  to={c.id === 'all' ? '/store' : `/store/${c.id}`}
                  className={activeCat === c.id ? 'active' : ''}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <main className="store-main">
          <div className="store-meta">
            <p>Showing {products.length} product(s)</p>
          </div>

          <div className="product-grid">
            {products.length === 0 ? (
              <div className="no-products">
                <p>No products found in this category.</p>
              </div>
            ) : (
              products.map(product => (
                <div key={product.id} className="product-card animate-fade-up">
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
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Store;
