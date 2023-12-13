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

const MenuHeader = ({ anchorEl, setAnchorEl, data }) => {
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
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
      <MenuItem onClick={handleClose}>
        <Icon icon={AccountCircleIcon} /> <NavLink to={`/usuario/${data.apelido}`}>Perfil</NavLink>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClose}>
        <Icon icon={NotificationsIcon} /> <NavLink to="/notificacoes">Notificações</NavLink>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Icon icon={SettingsIcon} /> <NavLink to="/perfil">Configurações</NavLink>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Icon icon={LogoutIcon} /> <NavLink to="/">Deslogar</NavLink>
      </MenuItem>
    </Menu>
  );
};

MenuHeader.propTypes = {
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func,
};

export default MenuHeader;
