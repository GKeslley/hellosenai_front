import { Box, IconButton, ListItem, Menu, MenuItem, Typography } from '@mui/material';
import { useContext, useState } from 'react';
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
import { UserGlobalContext } from '../contexts/UserContext';

const Options = ({
  sx,
  slugProject,
  getSlugProject,
  setSlugProject,
  author,
  queryClient,
}) => {
  const { data } = useContext(UserGlobalContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const text = useForm(true);
  const open = Boolean(anchorEl);

  const mutation = useMutation({
    mutationFn: ({ data, token }) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      return axios.post(
        `http://127.0.0.1:8000/api/v1/projeto/${slugProject}/denuncia`,
        data,
        config,
      );
    },
    onSuccess: () => {
      setOpenDialog(false);
      setAnchorEl(null);
    },
  });

  const mutationDeleteProject = useMutation({
    mutationFn: (token) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      return axios.delete(`http://127.0.0.1:8000/api/v1/projeto/${slugProject}`, config);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'], type: 'active' });
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

  const handleDeleteProject = () => {
    if (confirm('Realmente deseja deletar o projeto?') === true) {
      const token = localStorage.getItem('token');
      mutationDeleteProject.mutate(token);
      handleClose();
    }
  };

  const report = () => {
    if (slugProject && text.validate()) {
      const data = {
        texto: text.value,
      };
      const token = localStorage.getItem('token');
      mutation.mutate({ data, token });
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
        {data && data.apelido === author ? (
          <MenuItem onClick={handleDeleteProject} sx={{ gap: '0.5rem' }}>
            <DeleteIcon />
            Deletar
          </MenuItem>
        ) : (
          ''
        )}
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
  author: PropTypes.object,
  queryClient: PropTypes.object,
};

export default Options;
