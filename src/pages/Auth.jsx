import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';
import './Misc.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ name: 'Guest User', email });
    navigate('/');
  };

  return (
    <div className="auth-page page-padding animate-fade-up" style={{ position: 'relative' }}>
      <button 
        onClick={() => navigate('/')} 
        className="btn" 
        style={{ position: 'absolute', top: '20px', left: '20px', background: 'transparent', color: 'var(--text-main)', display: 'flex', gap: '8px', padding: 0 }}
      >
        <ArrowLeft size={18} /> Go Back to Home
      </button>

      <div className="auth-container">
        <h2>Welcome <em>Back</em></h2>
        <p>Enter your details to access your luxury account.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Sign In</button>
        </form>
        <p className="auth-switch">Don't have an account? <Link to="/signup">Register</Link></p>
      </div>
    </div>
  );
};

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate signup, redirect to login
    navigate('/login');
  };

  return (
    <div className="auth-page page-padding animate-fade-up" style={{ position: 'relative' }}>
      <button 
        onClick={() => navigate('/')} 
        className="btn" 
        style={{ position: 'absolute', top: '20px', left: '20px', background: 'transparent', color: 'var(--text-main)', display: 'flex', gap: '8px', padding: 0 }}
      >
        <ArrowLeft size={18} /> Go Back to Home
      </button>

      <div className="auth-container">
        <h2>Join <em>LUMIÈRE</em></h2>
        <p>Create an account for exclusive access to signature scents.</p>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Sign In</Link></p>
      </div>
    </div>
  );
};

export const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfile({ name });
    alert("Profile Updated Successfully!");
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="auth-page page-padding animate-fade-up">
      <div className="auth-container profile-container">
        <h2>Your <em>Profile</em></h2>
        <form onSubmit={handleUpdate} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={user.email} disabled />
          </div>
          <button type="submit" className="btn btn-outline w-100 mb-3">Update Details</button>
          <button type="button" className="btn btn-primary w-100" onClick={handleLogout}>Log Out</button>
        </form>
      </div>
    </div>
  );
};
