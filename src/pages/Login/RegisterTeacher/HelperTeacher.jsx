import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const HelperTeacher = ({sx}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return(
        <Box sx={sx}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{minWidth: 'auto', padding: '0'}}
          >
            <ErrorOutlineIcon sx={{width: '3rem', height: '3rem'}} />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <Typography sx={{padding: '0 1rem'}}>
                Para um professor ser registrado, é necessário uma primeira autenticação dos administradores
                para obter acesso ao sistema. Envie seus dados e caso seja aceito, enviaremos um email
                de confirmação!
            </Typography>
          </Menu>
        </Box>
      );
}

export default HelperTeacher