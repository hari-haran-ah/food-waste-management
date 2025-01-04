// components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

const PrivateRoute = ({ element }) => {
  const user = Cookies.get('user'); // Check if user exists in cookies

  // If the user is not authenticated, redirect to the sign-in page
  return user ? element : <Navigate to="/" />;
};

export default PrivateRoute;
