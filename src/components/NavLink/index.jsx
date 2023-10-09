import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles.css';

const NavLinkActive = ({ children, to, className }) => {
  return (
    <NavLink
      to={to}
      className={`${className} navlink transition-all border-solid relative after:w-0 after:h-0.5 after:block after:bg-white after:mt-1.5 after:absolute after:transition-all`}
    >
      {children}
    </NavLink>
  );
};

NavLinkActive.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default NavLinkActive;
