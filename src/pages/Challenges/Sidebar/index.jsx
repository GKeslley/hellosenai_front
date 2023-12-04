import SidebarInfos from './SidebarInfos';
import { Drawer } from '@mui/material';
import PropTypes from 'prop-types';

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle, data }) => {
  return (
    <>
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
        <SidebarInfos />
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
        <SidebarInfos data={data} />
      </Drawer>
    </>
  );
};

Sidebar.propTypes = {
  mobileOpen: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  data: PropTypes.object,
};

export default Sidebar;
