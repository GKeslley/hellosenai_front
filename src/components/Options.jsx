import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import { useContext } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import { UserGlobalContext } from '../contexts/UserContext';

const Options = ({
  sx,
  getSlugProject,
  setSlugProject,
  author,
  mutationDisableProject,
  setAnchorEl,
  setOpenDialog,
  anchorEl,
  setId,
  id,
}) => {
  const { data } = useContext(UserGlobalContext);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setId();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSlugProject(null);
  };

  const handleOpen = () => {
    getSlugProject();
    setOpenDialog(true);
  };

  const handleDisableProject = () => {
    if (confirm('Realmente deseja deletar o projeto?') === true) {
      const token = localStorage.getItem('token');
      const slug = getSlugProject();
      mutationDisableProject.mutate({ slug, token });
      handleClose();
    }
  };

  return (
    <Box sx={sx}>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      {id && (
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
          <MenuItem onClick={handleOpen} sx={{ gap: '0.5rem' }}>
            <WarningIcon />
            Denunciar
          </MenuItem>
          {data && data.apelido === author ? (
            <MenuItem onClick={handleDisableProject} sx={{ gap: '0.5rem' }}>
              <DeleteIcon />
              Desativar
            </MenuItem>
          ) : (
            ''
          )}
        </Menu>
      )}
    </Box>
  );
};

Options.propTypes = {
  sx: PropTypes.object,
  slugProject: PropTypes.string,
  getSlugProject: PropTypes.func,
  setSlugProject: PropTypes.func,
  author: PropTypes.string,
  queryClient: PropTypes.object,
  mutationDisableProject: PropTypes.object,
  setAnchorEl: PropTypes.func,
  setOpenDialog: PropTypes.func,
  anchorEl: PropTypes.bool,
  open: PropTypes.bool,
  setId: PropTypes.func,
  id: PropTypes.bool,
};

export default Options;
