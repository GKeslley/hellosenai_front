import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Icon from '../../Icon';
import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

const MenuHeader = ({ anchorEl, setAnchorEl, data, logout }) => {
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutAccount = () => {
    if (confirm('Tem certeza que deseja deslogar?') === true) {
      logout();
    }
  };

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <MenuItem>
        <Box
          component={NavLink}
          to={`/usuario/${data.apelido}`}
          sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
        >
          <Icon icon={AccountCircleIcon} /> <Typography>Perfil</Typography>
        </Box>
      </MenuItem>
      <Divider />
      <MenuItem>
        <Box
          component={NavLink}
          to="/notificacoes"
          sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
        >
          <Icon icon={NotificationsIcon} /> <Typography>Notificações</Typography>
        </Box>
      </MenuItem>
      <MenuItem>
        <Box
          component={NavLink}
          to="/perfil"
          sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
        >
          <Icon icon={SettingsIcon} /> <Typography>Configurações</Typography>
        </Box>
      </MenuItem>
      <MenuItem onClick={logoutAccount}>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <Icon icon={LogoutIcon} /> <Typography>Deslogar</Typography>
        </Box>
      </MenuItem>
    </Menu>
  );
};

MenuHeader.propTypes = {
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func,
  data: PropTypes.object,
  logout: PropTypes.func,
};

export default MenuHeader;
