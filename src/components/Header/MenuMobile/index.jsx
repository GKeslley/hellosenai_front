import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from 'prop-types';
import GitHubIcon from '@mui/icons-material/GitHub';
import RedeemIcon from '@mui/icons-material/Redeem';
import CodeIcon from '@mui/icons-material/Code';
import Icon from '../../Icon';
import { NavLink } from 'react-router-dom';

const MenuMobile = ({ anchorEl, setAnchorEl }) => {
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
        <Icon icon={GitHubIcon} /> <NavLink to="/projetos">Projetos</NavLink>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Icon icon={RedeemIcon} /> <NavLink to="/convites">Convites</NavLink>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Icon icon={CodeIcon} /> <NavLink to="/desafios">Desafios</NavLink>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClose}>
        <Icon icon={AccountCircleIcon} /> <NavLink to="/perfil">Minha Conta</NavLink>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClose}>
        <Icon icon={SettingsIcon} /> <NavLink to="/configuracoes">Configurações</NavLink>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <Icon icon={LogoutIcon} /> <NavLink to="/deslogar">Deslogar</NavLink>
      </MenuItem>
    </Menu>
  );
};

MenuMobile.propTypes = {
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func,
};

export default MenuMobile;
