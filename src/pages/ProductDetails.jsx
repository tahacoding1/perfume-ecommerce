import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { ShieldCheck, Truck, RotateCcw, Star } from 'lucide-react';
import { ALL_PRODUCTS } from '../data/products';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProduct = ALL_PRODUCTS.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Get 4 random products excluding this one
      const others = ALL_PRODUCTS.filter(p => p.id !== foundProduct.id);
      const shuffled = [...others].sort(() => 0.5 - Math.random());
      setSuggestedProducts(shuffled.slice(0, 4));
    }
  }, [id]);

  if (!product) {
    return (
      <div className="product-details-page page-padding text-center" style={{ paddingTop: '150px' }}>
        <h2>Product Not Found</h2>
        <Link to="/store" className="btn btn-outline" style={{ marginTop: '20px' }}>Back to Store</Link>
      </div>
    );
  }

  const handleCheckoutDirectly = () => {
    addToCart(product);
    navigate('/checkout');
  };

  return (
    <div className="product-details-page page-padding">
      <div className="container">
        
        {/* Main Product Layout */}
        <div className="product-details-grid">
          <div className="product-details-image animate-fade-up">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-details-content animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <span className="product-badge detail-badge">{product.type}</span>
            <h1 className="product-title">{product.name}</h1>
            
            <div className="product-meta-row">
              <span className="product-price">Rs. {product.price.toLocaleString()}</span>
              <div className="product-rating">
                <Star size={16} fill="currentColor" className="star-icon" />
                <span>{product.rating}</span>
                <span className="reviews-count">(128 Reviews)</span>
              </div>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
            </div>

            <div className="product-features">
              <div className="feature-item">
                <ShieldCheck size={20} />
                <span>100% Authentic Guaranteed</span>
              </div>
              <div className="feature-item">
                <Truck size={20} />
                <span>Express Nationwide Shipping</span>
              </div>
              <div className="feature-item">
                <RotateCcw size={20} />
                <span>7-Day Return Policy*</span>
              </div>
            </div>

            <div className="product-actions">
              <button className="btn btn-outline cart-btn" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
              <button className="btn btn-primary checkout-btn" onClick={handleCheckoutDirectly}>
                Proceed to Checkout
              </button>
            </div>
            
            <p className="secure-checkout-text">Secure Encrypted Checkout</p>
          </div>
        </div>

        {/* Suggested Products */}
        <section className="suggested-section animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="section-title text-center" style={{ fontSize: '32px', marginBottom: '40px' }}>
            You Might Also <em>Like</em>
          </h2>
          <div className="product-grid">
            {suggestedProducts.map(sugg => (
              <div key={sugg.id} className="product-card">
                <div className="product-img">
                  <Link to={`/product/${sugg.id}`} className="img-link-wrapper">
                    <span className="product-badge">{sugg.type}</span>
                    <img src={sugg.image} alt={sugg.name} />
                  </Link>
                  <div className="product-overlay">
                    <button className="btn btn-primary" onClick={() => addToCart(sugg)}>Add to Cart</button>
                    <Link to={`/product/${sugg.id}`} className="btn btn-outline btn-slide-fill">View Details</Link>
                  </div>
                </div>
                <Link to={`/product/${sugg.id}`} className="product-info">
                  <h3>{sugg.name}</h3>
                  <span className="type">{sugg.type}</span>
                  <div className="product-meta">
                    <span className="price">Rs. {sugg.price.toLocaleString()}</span>
                    <div className="rating">
                      <Star size={14} fill="currentColor" />
                      <span>{sugg.rating}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default ProductDetails;
