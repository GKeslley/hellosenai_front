import {
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Box,
  Grid,
  Avatar,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import './styles.css';
import ButtonComponent from '../../../Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AvatarUser from '../../../Avatar';
import { useState } from 'react';
import ModalComponent from '../../../Modal';
import InviteParticipants from '../InviteParticipants';

const Invite = ({
  modalAccessInvite,
  title,
  date,
  author,
  description,
  slug,
  participantes,
  setDataInvite,
}) => {
  const [openParticipants, setOpenParticipants] = useState(false);

  const handleClick = () => {
    setDataInvite({
      titulo: title,
      data: date,
      autor: author,
      descricao: description,
      slug,
    });
  };

  return (
    <Grid
      component={Card}
      item
      xs
      minWidth="250px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      margin="0 1% 24px"
      onClick={handleClick}
    >
      <CardActionArea>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '0.85rem',
              justifyContent: 'space-between',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <AvatarUser avatar={author.avatar} sx={{ width: '30px', height: '30px' }} />
              <Link to={`/usuario/${author.apelido}`}>{author.nome}</Link>
            </Box>

            {participantes && (
              <Typography
                sx={{ textDecoration: 'underline' }}
                onClick={() => setOpenParticipants(true)}
              >
                {participantes.length
                  ? `${participantes.length} ${
                      participantes.length > 1 ? 'participantes' : 'participante'
                    }`
                  : '0 participantes'}
              </Typography>
            )}
          </Box>
          <Typography gutterBottom fontSize="1.2rem" fontWeight="500">
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography fontSize="0.72rem">Postado em: {date}</Typography>
        <ButtonComponent
          variant="outlined"
          sx={{ justifySelf: 'right', maxWidth: 'max-content' }}
          onClick={modalAccessInvite}
          size="small"
        >
          Acessar
        </ButtonComponent>
      </CardActions>

      {openParticipants && participantes && participantes.length > 0 && (
        <InviteParticipants
          participants={participantes}
          handleClose={() => setOpenParticipants(false)}
          open={openParticipants}
        />
      )}
    </Grid>
  );
};

Invite.propTypes = {
  modalAccessInvite: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  author: PropTypes.object,
  slug: PropTypes.string,
  participantes: PropTypes.array,
  setDataInvite: PropTypes.func,
};

export default Invite;
