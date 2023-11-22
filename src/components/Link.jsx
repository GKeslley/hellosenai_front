import { Box } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';

const LinkComponent = ({children, to, end = 'false', color = '#fff', decoration = 'none', animation = true}) => {
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
          height: '0.125rem', marginTop: '0.375rem',
          position: 'absolute', transitionProperty: 'all',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
          transitionDuration: '150ms',
          background: color
        }, 
        ':hover:after': animation && {background: 'red', width: '100%' }}
      }
    >
      {children}
    </Box>
  );
}

export default LinkComponent