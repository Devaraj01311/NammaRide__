import { Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api';

const PrivateRoute = ({ children }) => {
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Call backend to verify admin auth
        const res = await api.get('/check-auth');
        if (res.data?.admin) setAuthorized(true);
        else setAuthorized(false);
      } catch (err) {
        console.error('Auth check error: ', err);
        setAuthorized(false);
      }
    };
    checkAuth();
  }, []);

  if (authorized === null) return <div className="p-8">Loading...</div>;
  return authorized ? children : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;
