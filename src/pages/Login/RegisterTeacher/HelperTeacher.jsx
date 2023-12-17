import { Box, Popover, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import PropTypes from 'prop-types';

const HelperTeacher = ({ sx }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={sx}>
      <Button
        id="basic-button"
        aria-describedby="popver"
        onClick={handleClick}
        sx={{ minWidth: 'auto', padding: '0' }}
      >
        <ErrorOutlineIcon sx={{ width: '3rem', height: '3rem' }} />
      </Button>
      <Popover
        id="popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ padding: '0.5rem 1rem' }}>
          Para um professor ser registrado, é necessário uma primeira autenticação dos
          administradores para obter acesso ao sistema. Envie seus dados e caso seja
          aceito, enviaremos um email de confirmação!
        </Typography>
      </Popover>
    </Box>
  );
};

HelperTeacher.propTypes = {
  sx: PropTypes.object,
};

export default HelperTeacher;
