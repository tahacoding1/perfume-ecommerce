import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import './OrderTrack.css';

const OrderTrack = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  // Real track state or mock state if accessed directly
  const orderId = state?.orderId || 'ORD-894721';
  const total = state?.total || 14000;
  const shippingCharges = state?.shippingCharges || 250;

  const [trackInput, setTrackInput] = useState(state?.orderId ? '' : orderId);
  const [trackingData, setTrackingData] = useState(state?.success ? {
    status: 'processing', // processing, shipping, delivered
    date: new Date().toLocaleDateString(),
  } : null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackInput) return;
    
    // Simulate real tracking fetch
    setTrackingData({
      status: 'shipping',
      date: new Date().toLocaleDateString(),
    });
  };

  return (
    <div className="track-page page-padding">
      <div className="container track-container">
        {state?.success && (
          <div className="success-banner animate-fade-up">
            <CheckCircle size={48} className="success-icon" />
            <h2>Order <em>Confirmed!</em></h2>
            <p>Thank you for your purchase. Your order has been received.</p>
            
            <div className="success-details">
              <div className="detail-box">
                <span>Order ID</span>
                <strong>{orderId}</strong>
              </div>
              <div className="detail-box">
                <span>Shipping</span>
                <strong>Rs. {shippingCharges}</strong>
              </div>
              <div className="detail-box">
                <span>Total Amount</span>
                <strong>Rs. {total.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        )}

        <div className="track-section animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="track-header">
            <h2>Track Your <em>Order</em></h2>
            <p>Enter your Order ID to see real-time updates.</p>
          </div>

          <form className="track-form" onSubmit={handleTrack}>
            <input 
              type="text" 
              placeholder="e.g. ORD-123456" 
              value={trackInput}
              onChange={(e) => setTrackInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">Track</button>
          </form>

          {trackingData && (
            <div className="tracking-timeline animate-fade-up">
              <div className={`timeline-step ${trackingData.status === 'processing' || trackingData.status === 'shipping' || trackingData.status === 'delivered' ? 'active' : ''}`}>
                <div className="step-icon"><Package size={20} /></div>
                <div className="step-info">
                  <h4>Processing</h4>
                  <p>Order is being prepared</p>
                </div>
              </div>
              <div className="timeline-connector active"></div>
              
              <div className={`timeline-step ${trackingData.status === 'shipping' || trackingData.status === 'delivered' ? 'active' : ''}`}>
                <div className="step-icon"><Truck size={20} /></div>
                <div className="step-info">
                  <h4>Shipped</h4>
                  <p>Out for delivery</p>
                </div>
              </div>
              <div className="timeline-connector"></div>
              
              <div className={`timeline-step ${trackingData.status === 'delivered' ? 'active' : ''}`}>
                <div className="step-icon"><Home size={20} /></div>
                <div className="step-info">
                  <h4>Delivered</h4>
                  <p>Arrived at destination</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTrack;
