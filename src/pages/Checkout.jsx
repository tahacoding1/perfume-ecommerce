import React, { useState } from 'react';
import { useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [bankDetails, setBankDetails] = useState({ bank: '', accountName: '', accountNumber: '', expiryDate: '', cvc: '' });

  const shippingCharges = 250;
  const finalTotal = cartTotal + shippingCharges;

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const formData = new FormData(e.target);
    const shipping_details = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      address: formData.get('address'),
      city: formData.get('city'),
      phone: formData.get('phone')
    };

    const payload = {
      total_price: finalTotal,
      shipping_details,
      payment_method: paymentMethod,
      items: cartItems
    };

    try {
      const axios = (await import('axios')).default;
      const res = await axios.post('http://127.0.0.1:8000/api/orders', payload);
      clearCart();
      
      const orderId = 'ORD-' + res.data.id;
      navigate('/track-order', { 
        state: { 
          orderId, 
          shippingCharges, 
          total: finalTotal,
          success: true 
        } 
      });
    } catch(err) {
      console.error(err);
      alert('Failed to place order. Please try again.');
    }
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
                <input type="text" name="firstName" required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" name="lastName" required />
              </div>
              <div className="form-group full-width">
                <label>Address</label>
                <input type="text" name="address" required />
              </div>
              <div className="form-group">
                <label>City</label>
                <input type="text" name="city" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" name="phone" required />
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
                          className="bank-select"
                          value={bankDetails.bank} 
                          onChange={(e) => setBankDetails({...bankDetails, bank: e.target.value})}
                        >
                          <option value="">Choose your bank...</option>
                          <option value="Sadapay">Sadapay</option>
                          <option value="Easypaisa">Easypaisa</option>
                          <option value="Meezan">Meezan Bank</option>
                          <option value="HBL">HBL</option>
                        </select>
                      </div>
                      
                      {(bankDetails.bank === 'Easypaisa' || bankDetails.bank === 'Sadapay') && (
                        <>
                          <div className="form-group" style={{ marginBottom: '20px' }}>
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
                            <label>Account Number</label>
                            <input 
                              type="text" 
                              required 
                              value={bankDetails.accountNumber} 
                              onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})} 
                              placeholder="03XXXXXXXXX"
                            />
                          </div>
                        </>
                      )}

                      {(bankDetails.bank === 'HBL' || bankDetails.bank === 'Meezan') && (
                        <>
                          <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label>Card Holder Name</label>
                            <input 
                              type="text" 
                              required 
                              value={bankDetails.accountName} 
                              onChange={(e) => setBankDetails({...bankDetails, accountName: e.target.value})} 
                              placeholder="Name on card"
                            />
                          </div>
                          <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label>Card Number / IBAN</label>
                            <input 
                              type="text" 
                              required 
                              value={bankDetails.accountNumber} 
                              onChange={(e) => setBankDetails({...bankDetails, accountNumber: e.target.value})} 
                              placeholder="XXXX-XXXX-XXXX-XXXX"
                            />
                          </div>
                          <div className="form-grid">
                            <div className="form-group">
                              <label>Expiry Date</label>
                              <input 
                                type="text" 
                                required 
                                value={bankDetails.expiryDate} 
                                onChange={(e) => setBankDetails({...bankDetails, expiryDate: e.target.value})} 
                                placeholder="MM/YY"
                              />
                            </div>
                            <div className="form-group">
                              <label>CVC</label>
                              <input 
                                type="text" 
                                required 
                                value={bankDetails.cvc} 
                                onChange={(e) => setBankDetails({...bankDetails, cvc: e.target.value})} 
                                placeholder="123"
                              />
                            </div>
                          </div>
                        </>
                      )}
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
