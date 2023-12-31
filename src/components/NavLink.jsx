import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavLinkActive = ({
  children,
  to,
  color = '#fff',
  background = '#fff',
  end = false,
  fontWeight = '800',
  sx,
  after,
  top = false,
}) => {
  return (
    <Box
      component={NavLink}
      to={to}
      end={end}
      fontWeight={fontWeight}
      sx={{
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
        borderStyle: 'solid',
        position: 'relative',
        width: 'max-content',
        color: color,
        '&:after': {
          content: "''",
          display: 'block',
          width: '0px',
          height: '0.125rem',
          marginTop: '0.375rem',
          position: 'absolute',
          transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '150ms',
          background: background,
          top: top ? top : 'auto',
          ...after,
        },
        ':hover:after': { background: background, width: '100%' },
        '&.active:after': {
          background: background,
          width: '100%',
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

NavLinkActive.propTypes = {
  children: PropTypes.string,
  to: PropTypes.string,
  end: PropTypes.bool,
  color: PropTypes.string,
  background: PropTypes.string,
  fontWeight: PropTypes.string,
  after: PropTypes.object,
  top: PropTypes.string,
  sx: PropTypes.object,
};

export default NavLinkActive;
