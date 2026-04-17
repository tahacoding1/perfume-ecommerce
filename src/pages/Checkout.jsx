import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [bankDetails, setBankDetails] = useState({ bank: '', accountName: '', accountNumber: '' });

  const shippingCharges = 250;
  const finalTotal = cartTotal + shippingCharges;

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    // Simulate order placement
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    clearCart();
    
    // Pass order details via state to OrderTrack page
    navigate('/track-order', { 
      state: { 
        orderId, 
        shippingCharges, 
        total: finalTotal,
        success: true 
      } 
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page page-padding text-center">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/store')} className="btn btn-primary mt-4">Browse Collection</button>
      </div>
    );
  }

  return (
    <div className="checkout-page page-padding">
      <div className="container checkout-container">
        <form className="checkout-form animate-fade-up" onSubmit={handleCheckout}>
          <div className="checkout-section">
            <h2>Shipping <em>Details</em></h2>
            <div className="form-grid">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" required />
              </div>
              <div className="form-group full-width">
                <label>Address</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" required />
              </div>
            </div>
          </div>

          <div className="checkout-section">
            <h2>Payment <em>Method</em></h2>
            <div className="payment-methods">
              <label className={`payment-option ${paymentMethod === 'cod' ? 'selected' : ''}`}>
                <input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <div className="option-info">
                  <h4>Cash on Delivery</h4>
                  <p>Pay when you receive your order.</p>
                </div>
              </label>
              <label className={`payment-option ${paymentMethod === 'bank' ? 'selected' : ''}`}>
                <input type="radio" name="payment" value="bank" checked={paymentMethod === 'bank'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <div className="option-info" style={{ width: '100%' }}>
                  <h4>Bank Transfer</h4>
                  <p>Pay instantly via local banks and wallets.</p>
                  
                  {paymentMethod === 'bank' && (
                    <div className="bank-details-form animate-fade-up" style={{ marginTop: '20px' }}>
                      <div className="form-group">
                        <label>Select Bank</label>
                        <select 
                          required 
                          value={bankDetails.bank} 
                          onChange={(e) => setBankDetails({...bankDetails, bank: e.target.value})}
                          style={{ width: '100%', padding: '12px 16px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-main)' }}
                        >
                          <option value="">Choose your bank...</option>
                          <option value="Sadapay">Sadapay</option>
                          <option value="Easypaisa">Easypaisa</option>
                          <option value="Meezan">Meezan Bank</option>
                          <option value="HBL">HBL</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Account Title</label>
                        <input 
                          type="text" 
                          required 
                          value={bankDetails.accountName} 
                          onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})} 
                          placeholder="Name on account"
                        />
                      </div>
                      <div className="form-group">
                        <label>Account Number / IBAN</label>
                        <input 
                          type="text" 
                          required 
                          value={bankDetails.accountNumber} 
                          onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})} 
                          placeholder="Account No."
                        />
                      </div>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100 place-order-btn">Place Order</button>
        </form>

        <div className="checkout-summary animate-fade-up style={{animationDelay: '0.2s'}}">
          <h2>Order <em>Summary</em></h2>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.id} className="summary-item">
                <div className="s-img">
                  <img src={item.image} alt={item.name} />
                  <span className="s-qty">{item.quantity}</span>
                </div>
                <div className="s-info">
                  <h4>{item.name}</h4>
                  <p>{item.type}</p>
                </div>
                <div className="s-price">Rs. {(item.price * item.quantity).toLocaleString()}</div>
              </div>
            ))}
          </div>

          <div className="summary-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>Rs. {cartTotal.toLocaleString()}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>Rs. {shippingCharges}</span>
            </div>
            <div className="total-row grand-total">
              <span>Total</span>
              <span>Rs. {finalTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
