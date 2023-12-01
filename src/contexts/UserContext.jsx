import { createContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useContext } from 'react';

export const UserGlobalContext = createContext();

const UserContext = ({ children }) => {
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  };

  const { data, isLoading, error } = useQuery('user', () => {
    return axios
      .get('http://127.0.0.1:8000/api/auth/profile', config)
      .then((response) => response.data);
  });

  return (
    <UserGlobalContext.Provider value={{ data, isLoading, error }}>
      {children}
    </UserGlobalContext.Provider>
  );
};

UserContext.propTypes = {
  children: PropTypes.array,
};

export default UserContext;
