import SidebarInfos from './SidebarInfos';
import { Drawer } from '@mui/material';
import PropTypes from 'prop-types';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle, data, isMobile }) => {
  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: isMobile ? 'none' : 'block',
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        <SidebarInfos />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: isMobile ? 'none' : 'block',
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            position: 'static',
            padding: '1rem',
          },
        }}
        open
      >
        <SidebarInfos data={data} />
      </Drawer>
    </>
  );
};

Sidebar.propTypes = {
  mobileOpen: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  data: PropTypes.object,
  isMobile: PropTypes.bool,
};

export default Sidebar;
