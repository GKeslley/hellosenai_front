import { Box, IconButton, ListItem, Menu, MenuItem, Typography } from '@mui/material';
import { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import WarningIcon from '@mui/icons-material/Warning';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import { useMutation } from 'react-query';
import axios from 'axios';
import ModalComponent from './Modal';
import Input from './Form/Input';
import useForm from '../hooks/useForm';
import ButtonComponent from './Button';

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
};

const Options = ({ sx, slugProject, getSlugProject, setSlugProject }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const text = useForm(true);
  const open = Boolean(anchorEl);

  const mutation = useMutation({
    mutationFn: (dataDenounce) => {
      return axios.post(
        `http://127.0.0.1:8000/api/v1/projeto/${slugProject}/denuncia`,
        dataDenounce,
        config,
      );
    },
    onSuccess: () => {
      setOpenDialog(false);
      setAnchorEl(null);
    },
  });

  const handleClick = (event) => {
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

  const report = () => {
    if (slugProject && text.validate()) {
      mutation.mutate({
        texto: text.value,
      });
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
        <MenuItem onClick={handleClose} sx={{ gap: '0.5rem' }}>
          <DeleteIcon />
          Deletar
        </MenuItem>
      </Menu>

      {openDialog && (
        <ModalComponent setOpenModal={setOpenDialog} openModal={openDialog}>
          <ListItem>
            <Typography variant="h4" fontWeight="500">
              Denunciar Projeto
            </Typography>
          </ListItem>

          <ListItem
            sx={{
              display: 'flex',
              gap: '0.5rem',
              flexDirection: 'column',
              alignItems: 'start',
            }}
          >
            <Typography>Motivo da denúncia:</Typography>
            <Input
              required={true}
              fullWidth={true}
              label="Denúncia"
              onChange={text.onChange}
              value={text.value}
              onBlur={text.onBlur}
              multiline
              minRows={5}
            />
            <ButtonComponent
              sx={{ alignSelf: 'end' }}
              onClick={report}
              isLoading={mutation.isLoading}
            >
              Denunciar
            </ButtonComponent>
          </ListItem>
        </ModalComponent>
      )}
    </Box>
  );
};

Options.propTypes = {
  sx: PropTypes.object,
  slugProject: PropTypes.string,
  getSlugProject: PropTypes.func,
  setSlugProject: PropTypes.func,
};

export default Options;
