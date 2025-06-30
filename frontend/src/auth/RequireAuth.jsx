import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Allow only if user came from '/' or '/signup'
    const allowedReferrers = ['/', '/signup'];

    // Check where the user came from (history stack)
    const cameFrom = document.referrer;

    // If not came from allowed pages, redirect
    if (!cameFrom || (!cameFrom.includes('/signup') && !cameFrom.includes('/'))) {
      navigate('/signup');
    }
  }, [navigate]);

  return <>{children}</>;
};

export default RequireAuth;
