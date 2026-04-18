import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = 'http://127.0.0.1:8000/api';

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        try {
          const res = await axios.get(`${API_URL}/user`);
          setUser(res.data);
        } catch (err) {
          localStorage.removeItem('auth_token');
          delete axios.defaults.headers.common['Authorization'];
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const loginUser = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      setUser(res.data.user);
      localStorage.setItem('auth_token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      return true;
    } catch (err) {
      console.error(err);
      alert('Login failed. Please check credentials.');
      return false;
    }
  };

  const registerUser = async (userData) => {
    try {
      const res = await axios.post(`${API_URL}/register`, userData);
      setUser(res.data.user);
      localStorage.setItem('auth_token', res.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
      return true;
    } catch (err) {
      console.error(err);
      alert('Registration failed.');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
    delete axios.defaults.headers.common['Authorization'];
  };

  const updateProfile = (newData) => {
    setUser({ ...user, ...newData });
    alert('Profile details updated!');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
