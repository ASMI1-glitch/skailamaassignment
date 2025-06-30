import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RequireAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/'); // Always redirect to home
  }, [navigate]);

  return null; // Don't render anything
};

export default RequireAuth;
