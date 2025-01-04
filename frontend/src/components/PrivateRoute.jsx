// components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext); // Get user data from AuthContext

  // If the user is not authenticated, redirect to the sign-in page
  return user ? element : <Navigate to="/" />;
};

export default PrivateRoute;
