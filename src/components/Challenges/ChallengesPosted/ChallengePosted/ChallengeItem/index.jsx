import { Box, MenuItem, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import AvatarUser from '../../../../Avatar';
import OptionsComponent from '../../../../OptionsComponent';
import ButtonComponent from '../../../../Button';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
        <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <AvatarUser avatar={data.autor.avatar} />
          <Box>
            <Typography fontSize="0.875rem">{data.autor.nome}</Typography>
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

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginTop: '0.5rem',
        }}
      >
        <Typography fontWeight="800">{data.titulo}</Typography>
        <Typography sx={{ whiteSpace: 'pre-line' }}>{data.descricao}</Typography>
        <ButtonComponent
          sx={{ alignSelf: 'end' }}
          component={Link}
          to={`/projetos?desafio=${data.slug}`}
        >
          Realizar
        </ButtonComponent>
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
