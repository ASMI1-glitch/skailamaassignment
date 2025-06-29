import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAsmi } from '../context/contextAsmi';

const RequireAuth = ({ children }) => {
const { user } = useAsmi();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token || !user) {
      navigate('/');
    }
  }, [token, user, navigate]);

  if (!token || !user) return null;

  return <>{children}</>;
};

export default RequireAuth;
