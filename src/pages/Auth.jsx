import React, { useState } from 'react';
import { useNavigate, useLocation, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ArrowLeft } from 'lucide-react';
import './Misc.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
    navigate(from, { replace: true });
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
        <p className="auth-switch">Don't have an account? <Link to="/signup" state={{ from }}>Register</Link></p>
      </div>
    </div>
  );
};

export const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const from = location.state?.from || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({ name, email, password });
    navigate(from, { replace: true });
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
        <p className="auth-switch">Already have an account? <Link to="/login" state={{ from }}>Sign In</Link></p>
      </div>
    </div>
  );
};

export const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [password, setPassword] = useState(user?.password || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfile({ name, password, phone, address });
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
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Phone Number (Optional)</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="03XXXXXXXXX" />
          </div>
          <div className="form-group">
            <label>Home Address (Optional)</label>
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter details..." />
          </div>
          <button type="submit" className="btn btn-outline w-100 mb-3">Update Details</button>
          <button type="button" className="btn btn-primary w-100" onClick={handleLogout}>Log Out</button>
        </form>
      </div>
    </div>
  );
};
