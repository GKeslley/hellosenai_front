import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles.css';

const NavLinkActive = ({ children, to, className, color, end = false }) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={`${
        className ? className : ''
      } navlink transition-all border-solid relative after:w-0 after:h-0.5 after:block ${
        color ? `after:bg-${color}` : 'after:bg-white'
      } after:mt-1.5 after:absolute after:transition-all`}
    >
      {children}
    </NavLink>
  );
};

NavLinkActive.propTypes = {
  children: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  end: PropTypes.bool,
  color: PropTypes.string,
};

export default NavLinkActive;
