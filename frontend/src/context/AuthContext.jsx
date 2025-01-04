// context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (from cookies)
    const storedUser = Cookies.get('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parse the cookie data
    }
  }, []);

  const login = (userData) => {
    Cookies.set('user', JSON.stringify(userData), { expires: 7, secure: true, sameSite: 'Strict' });
    setUser(userData);
    navigate('/home'); // Redirect to home page after successful login
  };

  const logout = () => {
    Cookies.remove('user');
    setUser(null);
    navigate('/'); // Redirect to sign-in page after logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
