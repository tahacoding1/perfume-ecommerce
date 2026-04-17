import React from 'react';
import { useParams } from 'react-router-dom';
import './Misc.css';

const POLICIES = {
  privacy: {
    title: 'Privacy Policy',
    content: (
      <>
        <p>At LUMIÈRE, we are committed to safeguarding the privacy of our distinguished clientele. This Privacy Policy outlines how we collect, use, and protect your personal information.</p>
        <p><strong>Information Collection:</strong> We collect your name, email address, shipping address, and phone number exclusively for order fulfillment and personalized service. Payment information is securely processed by our third-party banking partners and is never stored on our servers.</p>
        <p><strong>Information Usage:</strong> Your data is used exclusively to deliver your luxury fragrances, provide order updates, and occasionally notify you of exclusive private sales if you have opted into our newsletter. We will never sell, lease, or trade your data to any external marketing firms.</p>
        <p>If you wish to have your data completely expunged from our records, please contact our concierge team.</p>
      </>
    )
  },
  terms: {
    title: 'Terms of Service',
    content: (
      <>
        <p>Welcome to LUMIÈRE. By accessing our boutique online, you agree to comply with and be bound by the following terms of elegantly conducting business with us.</p>
        <p><strong>Product Availability:</strong> Due to the rare ingredients used in our Oud and Extrait de Parfum collections, highly demanded items may occasionally be placed on backorder. We reserve the right to limit quantities purchased per person.</p>
        <p><strong>Pricing:</strong> All prices are listed in PKR and are subject to change without prior notice. We strive to maintain absolute accuracy in our pricing, but in the rare event of a typographical error, we reserve the right to cancel orders placed at an incorrect price.</p>
        <p><strong>Intellectual Property:</strong> All imagery, text, and branding is the exclusive property of LUMIÈRE and is protected by copyright laws. Unauthorized reproduction is strictly forbidden.</p>
      </>
    )
  },
  shipping: {
    title: 'Shipping Policy',
    content: (
      <>
        <p>We believe the unboxing experience should be as flawless as the scent itself. Here is exactly what you can expect when ordering from LUMIÈRE.</p>
        <p><strong>Processing & Dispatch:</strong> All orders are meticulously packaged by hand. Orders placed before 2:00 PM PKT are processed on the same business day. Orders placed on Sundays or public holidays will be dispatched the following business day.</p>
        <p><strong>Delivery Times:</strong> Standard nationwide shipping across Pakistan requires 3-5 business days. Express overnight delivery may be available for major cities upon request.</p>
        <p><strong>Returns & Exchanges:</strong> Due to health and safety regulations surrounding cosmetics, open or used bottles cannot be returned. If a product arrives damaged, please contact us within 24 hours of delivery. Please note: Tester boxes are strictly final sale items.</p>
      </>
    )
  }
};

const PolicyPage = () => {
  const { type } = useParams();
  const policy = POLICIES[type] || { title: 'Policy Not Found', content: 'The requested policy does not exist.' };

  return (
    <div key={type} className="info-page page-padding animate-fade-up">
      <div className="container">
        <div className="info-header text-center">
          <h1 className="section-title"><em>{policy.title}</em></h1>
        </div>
        <div className="policy-content" style={{ animationDelay: '0.2s' }}>
          <p>{policy.content}</p>
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
