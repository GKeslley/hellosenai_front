import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LinkComponent = ({
  children,
  to,
  end = false,
  color = '#fff',
  decoration = 'none',
  animation = true,
  after,
  sx,
}) => {
  return (
    <Box
      component={Link}
      to={to}
      end={end}
      sx={{
        transitionProperty: 'all',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '150ms',
        borderStyle: 'solid',
        position: 'relative',
        width: 'max-content',
        textDecoration: decoration,
        '&:after': animation && {
          content: "''",
          display: 'block',
          width: '0px',
          height: '0.125rem',
          marginTop: '0.375rem',
          position: 'absolute',
          transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '150ms',
          background: color,
          ...after,
        },
        ':hover:after': animation && { background: 'red', width: '100%' },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
};

LinkComponent.propTypes = {
  children: PropTypes.string,
  to: PropTypes.string,
  end: PropTypes.bool,
  color: PropTypes.string,
  decoration: PropTypes.string,
  animation: PropTypes.bool,
  after: PropTypes.object,
  sx: PropTypes.object,
};

export default LinkComponent;
