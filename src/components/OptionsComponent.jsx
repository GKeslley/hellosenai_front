import { Box, IconButton, Menu } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PropTypes from 'prop-types';

const OptionsComponent = ({ children, onClick, anchorEl, handleClose }) => {
  const open = Boolean(anchorEl);

  return (
    <Box>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={onClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ gap: '0.5rem' }}
      >
        {children}
      </Menu>
    </Box>
  );
};

OptionsComponent.propTypes = {
  children: PropTypes.array,
  onClick: PropTypes.func,
  anchorEl: PropTypes.bool,
  handleClose: PropTypes.func,
  sx: PropTypes.object,
};

export default OptionsComponent;
