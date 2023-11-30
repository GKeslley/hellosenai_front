import { Box, Container, Drawer, useMediaQuery } from '@mui/material';
import Challenge from './Challenge';
import SideberInfos from './Sidebar';
import { useState } from 'react';
import Sidebar from './Sidebar';

const drawerWidth = 240;

const Challenges = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      component="section"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        flexGrow: '1'
      }}
    >
      <Sidebar />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          marginBottom: '2rem',
          marginTop: '2rem',
          padding: isMobile ? '0 1rem' : '0 2rem',
          alignSelf: 'flex-start'
        }}
      >
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
        <Box
          sx={{
            height: 0,
            width: '18.75rem',
            minWidth: '18.75rem',
            flexGrow: '1',
            margin: '0 1% 24px',
            marginTop: 0,
            marginBottom: 0,
          }}
        ></Box>
        <Box
          sx={{
            height: 0,
            width: '18.75rem',
            minWidth: '18.75rem',
            flexGrow: '1',
            margin: '0 1% 24px',
            marginBottom: 0,
            marginTop: 0,
          }}
        ></Box>
        <Box
          sx={{
            height: 0,
            width: '18.75rem',
            minWidth: '18.75rem',
            flexGrow: '1',
            margin: '0 1% 24px',
            marginBottom: 0,
            marginTop: 0,
          }}
        ></Box>
      </Box>
    </Box>
  );
};

export default Challenges;
