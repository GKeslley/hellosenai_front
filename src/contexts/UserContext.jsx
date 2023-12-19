import { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserGlobalContext = createContext();

const UserContext = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['user', token],
    queryFn: () => {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };

      return axios
        .get('http://127.0.0.1:8000/api/auth/profile', config)
        .then((response) => response.data);
    },
    enabled: !!token,
  });

  return (
    <UserGlobalContext.Provider value={{ data, isLoading, error, logout, token, setToken }}>
      {children}
    </UserGlobalContext.Provider>
  );
};

UserContext.propTypes = {
  children: PropTypes.array,
};

export default UserContext;
