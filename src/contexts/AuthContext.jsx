import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check local storage for persistent simulated login
    const storedUser = localStorage.getItem('perfume-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const loginUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem('perfume-users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    const userData = foundUser || { name: email.split('@')[0], email, password };
    setUser(userData);
    localStorage.setItem('perfume-user', JSON.stringify(userData));
  };

  const registerUser = (userData) => {
    const users = JSON.parse(localStorage.getItem('perfume-users') || '[]');
    users.push(userData);
    localStorage.setItem('perfume-users', JSON.stringify(users));
    setUser(userData);
    localStorage.setItem('perfume-user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('perfume-user');
  };

  const updateProfile = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);
    localStorage.setItem('perfume-user', JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem('perfume-users') || '[]');
    const index = users.findIndex(u => u.email === user.email);
    if (index > -1) {
      users[index] = updatedUser;
    } else {
      users.push(updatedUser);
    }
    localStorage.setItem('perfume-users', JSON.stringify(users));
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, registerUser, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
