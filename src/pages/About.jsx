import React from 'react';
import './Misc.css'; // Shared CSS for info pages

export const About = () => {
  return (
    <div className="info-page page-padding animate-fade-up">
      <div className="container">
        <div className="info-header">
          <span className="section-label">Our Heritage</span>
          <h1 className="section-title">The Story of <em>LUMIÈRE</em></h1>
        </div>
        <div className="info-content">
          <div className="about-grid">
            <div className="about-text">
              <p>Founded in 2010, LUMIÈRE began with a singular vision: to restore the artistry and uncompromising quality of classical perfumery.</p>
              <p>Our founder travelled the globe to source the rarest ingredients—from authentic Indian Oud to hand-picked Damascus Roses. We believe a fragrance is not just a scent, but an invisible garment that speaks for you before a word is spoken.</p>
              <p>Each bottle is a testament to time, patience, and the pursuit of olfactive perfection.</p>
            </div>
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&q=80&w=800" alt="Perfume Ingredients" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Contact = () => {
  return (
    <div className="info-page page-padding animate-fade-up">
      <div className="container">
        <div className="info-header text-center">
          <span className="section-label">Get in Touch</span>
          <h1 className="section-title">Contact <em>Us</em></h1>
        </div>
        <div className="contact-wrapper">
          <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" required />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <input type="text" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea rows="5" required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Send Message</button>
          </form>
          <div className="contact-info">
            <h3>Boutique Details</h3>
            <p><strong>Boutique Address:</strong><br/>12A Luxury Avenue, Gulberg III, Lahore, Pakistan</p>
            <p><strong>Phone:</strong><br/>+92 300 1234567</p>
            <p><strong>Hours:</strong><br/>Mon - Sat: 10:00 AM - 9:00 PM<br/>Sun: Closed</p>
          </div>
        </div>
      </div>
    </div>
  );
};
