import {
  Avatar,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Box,
  Grid,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import './styles.css';
import ButtonComponent from '../../../Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Invite = ({
  modalAccessInvite,
  title,
  date,
  author,
  description,
  slug,
  setDataInvite,
}) => {
  const handleClick = () => {
    setDataInvite({ titulo: title, data: date, autor: author, descricao: description, slug });
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
          <Box className="flex items-center gap-x-4 mb-4">
            <Avatar sx={{ width: '30px', height: '30px' }} />
            <Link to={`/usuario/${author.apelido}`}>{author.nome}</Link>
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
    </Grid>
  );
};

Invite.propTypes = {
  modalAccessInvite: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  date: PropTypes.string,
  author: PropTypes.object,
  setDataInvite: PropTypes.func,
};

export default Invite;
