import React, { useState } from 'react';
import './Store.css'; // Reuse basic CSS

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');
    import('axios').then(axios => {
      axios.default.post('http://127.0.0.1:8000/api/contact', formData)
        .then(() => {
          setStatus('Message Sent Successfully!');
          setFormData({ name: '', email: '', subject: '', message: '' });
        })
        .catch(() => setStatus('Failed to send message.'));
    });
  };

  return (
    <div className="page-padding container">
      <h1 className="section-title text-center">Contact <em>Us</em></h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input className="input-field" placeholder="Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'var(--card-bg)', color: 'var(--text-color)' }} />
        <input className="input-field" type="email" placeholder="Email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'var(--card-bg)', color: 'var(--text-color)' }} />
        <input className="input-field" placeholder="Subject" required value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'var(--card-bg)', color: 'var(--text-color)' }} />
        <textarea className="input-field" placeholder="Your Message" required rows="5" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '12px', background: 'var(--card-bg)', color: 'var(--text-color)' }} />
        <button type="submit" className="btn btn-primary">Send Message</button>
        {status && <p className="text-center">{status}</p>}
      </form>
    </div>
  );
};

export default Contact;
