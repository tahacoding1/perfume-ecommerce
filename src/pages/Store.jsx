import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { Star, Filter } from 'lucide-react';
import './Store.css';



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
  const [products, setProducts] = useState([]);
  const [allFetchedProducts, setAllFetchedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const catToSet = category || 'all';
    setActiveCat(catToSet);
    
    // Fetch once
    if (allFetchedProducts.length === 0) {
      import('axios').then(axios => {
        axios.default.get('http://127.0.0.1:8000/api/products')
          .then(res => {
            const data = res.data;
            setAllFetchedProducts(data);
            if (catToSet === 'all') {
              setProducts(data);
            } else {
              setProducts(data.filter(p => p.category === catToSet));
            }
            setLoading(false);
          })
          .catch(err => {
            console.error("Failed to load products from API", err);
            setLoading(false);
          });
      });
    } else {
      // Filter existing
      if (catToSet === 'all') {
        setProducts(allFetchedProducts);
      } else {
        setProducts(allFetchedProducts.filter(p => p.category === catToSet));
      }
    }
  }, [category, allFetchedProducts]);

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
                    <Link to={`/product/${product.id}`} className="img-link-wrapper">
                      <span className="product-badge">{product.type}</span>
                      <img src={product.image} alt={product.name} />
                    </Link>
                    <div className="product-overlay">
                      <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
                      <Link to={`/product/${product.id}`} className="btn btn-outline btn-slide-fill">View Details</Link>
                    </div>
                  </div>
                  <Link to={`/product/${product.id}`} className="product-info">
                    <h3>{product.name}</h3>
                    <span className="type">{product.type}</span>
                    <div className="product-meta">
                      <span className="price">Rs. {product.price.toLocaleString()}</span>
                      <div className="rating">
                        <Star size={14} fill="currentColor" />
                        <span>{product.rating}</span>
                      </div>
                    </div>
                  </Link>
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
