import {
  Avatar,
  Card,
  CardContent,
  CardActionArea,
  CardActions,
  Box,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import './styles.css';
import ButtonComponent from '../../../Button';
import PropTypes from 'prop-types';

const Invite = ({ modalAccessInvite }) => {
  return (
    <Card sx={{ minWidth: 245, flex: '1' }}>
      <CardActionArea>
        <CardContent>
          <Box className="flex items-center gap-x-4 mb-4">
            <Avatar sx={{ width: '30px', height: '30px' }} />
            <Typography>Fulano</Typography>
          </Box>
          <Typography gutterBottom variant="h5" fontWeight="500">
            Facebook
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ButtonComponent
          variant="outlined"
          sx={{ justifySelf: 'right', maxWidth: 'max-content' }}
          onClick={modalAccessInvite}
          size="small"
        >
          Acessar
        </ButtonComponent>
      </CardActions>
    </Card>
  );
};

Invite.propTypes = {
  modalAccessInvite: PropTypes.func,
};

export default Invite;
