import { Box, MenuItem, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import OptionsComponent from '../../../../OptionsComponent';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';

const ChallengeItem = ({ data, setChallenge, setOpenDialog, dataUser }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const onClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditChallenge = (data) => {
    setChallenge(data);
    setOpenDialog(true);
  };

  const handleDeleteChallenge = () => {
    if (confirm('Realmente deseja deletar o desafio?') === true) {
      setAnchorEl(false);
    }
  };
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: '1rem',
        border: '0.0625rem solid #dadce0',
      }}
      elevation={0}
      key={data.titulo}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{ display: 'flex', gap: '1rem', alignItems: 'center', width: '100%' }}
          component={Link}
          to={`/desafios/desafio/${data.slug}`}
        >
          <Box
            component="figure"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgb(95,99,104)',
              borderRadius: '50%',
              width: '2.5rem',
              height: '2.5rem',
            }}
          >
            <AssignmentIcon sx={{ fill: '#fff' }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              fontWeight={500}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              Novo desafio: {data.titulo}
            </Typography>

            <Typography component="time" fontSize="0.75rem" color="rgb(169, 162, 151)">
              {data.dataCriacao}
            </Typography>
          </Box>
        </Box>

        {dataUser && data.autor.apelido === dataUser.apelido && (
          <OptionsComponent
            onClick={onClick}
            handleClose={handleClose}
            anchorEl={anchorEl}
          >
            <MenuItem
              onClick={() =>
                handleEditChallenge({
                  title: data.titulo,
                  description: data.descricao,
                  slug: data.slug,
                })
              }
              sx={{ gap: '0.5rem' }}
            >
              <EditIcon />
              Editar
            </MenuItem>
            <MenuItem onClick={handleDeleteChallenge} sx={{ gap: '0.5rem' }}>
              <DeleteIcon />
              Deletar
            </MenuItem>
          </OptionsComponent>
        )}
      </Box>
    </Paper>
  );
};

ChallengeItem.propTypes = {
  data: PropTypes.object,
  setChallenge: PropTypes.func,
  setOpenDialog: PropTypes.func,
  dataUser: PropTypes.object,
};

export default ChallengeItem;
