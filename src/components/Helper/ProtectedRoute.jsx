import { useContext } from 'react';
import { UserGlobalContext } from '../../contexts/UserContext';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(UserGlobalContext);

  if (!token) return <Navigate to="/login" />;
  return <>{children}</>;
};

ProtectedRoute.propTypes = {
  children: PropTypes.object,
};

export default ProtectedRoute;
