import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to properties admin by default
    navigate('/admin/properties', { replace: true });
  }, [navigate]);

  return null;
};

export default Admin;