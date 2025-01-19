// ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useApi from '../hooks/useApi';
import { useDispatch } from 'react-redux';
import {
    setUser
  } from "../redux/features/user/userSlice.js"

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { sendRequest } = useApi();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await sendRequest('/server/v1/api/user/authcheck', 'GET');
        if (data.authenticated) {
          setIsAuthenticated(data.authenticated);
          dispatch(
            setUser(data.user)
           );
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  // While loading, you could return a spinner or loader
  if (isAuthenticated === null) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
