import { Box, Container, Drawer } from '@mui/material';
import Challenge from './Challenge';
import SideberInfos from './SidebarInfos';
import { useState } from 'react';

const drawerWidth = 240;

const Challenges = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      component="section"
      sx={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
      }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        <SideberInfos />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            position: 'static',
            padding: '1rem',
          },
        }}
        open
      >
        <SideberInfos />
      </Drawer>

      <Container
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          marginBottom: '2rem',
          marginTop: '2rem',
        }}
      >
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
        <Box
          sx={{
            height: 0,
            width: '15.75rem',
            minWidth: '15.75rem',
            flexGrow: '1',
            margin: '0 1% 24px',
            marginTop: 0,
            marginBottom: 0,
          }}
        ></Box>
        <Box
          sx={{
            height: 0,
            width: '15.75rem',
            minWidth: '15.75rem',
            flexGrow: '1',
            margin: '0 1% 24px',
            marginBottom: 0,
            marginTop: 0,
          }}
        ></Box>
        <Box
          sx={{
            height: 0,
            width: '15.75rem',
            minWidth: '15.75rem',
            flexGrow: '1',
            margin: '0 1% 24px',
            marginBottom: 0,
            marginTop: 0,
          }}
        ></Box>
      </Container>
    </Box>
  );
};

export default Challenges;
