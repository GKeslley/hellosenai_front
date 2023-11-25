import { createContext } from 'react';
import PropTypes from 'prop-types';

const UserGlobalContext = createContext();

const UserContext = ({ children }) => {
  return <UserGlobalContext.Provider>{children}</UserGlobalContext.Provider>;
};

UserContext.propTypes = {
  children: PropTypes.string,
};

export default UserContext;
