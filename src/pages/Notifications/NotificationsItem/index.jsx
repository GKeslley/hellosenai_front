import { Box, Button, Divider, List, ListItem, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AvatarUser from '../../../components/Avatar';

const NotificationsItem = ({ data }) => {
  return (
    <List>
      <Paper
        component={ListItem}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '0',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '1rem',
            alignItems: 'start',
            width: '100%',
            padding: '1rem 1rem 0 1rem',
          }}
        >
          <AvatarUser avatar={data.remetente.avatar} />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
              width: '100%',
            }}
          >
            <Box
              component={Link}
              fontWeight="800"
              to={`/usuario/${data.remetente.apelido}`}
            >
              {data.remetente.nome}
            </Box>
            <Typography>Aceitou seu convite</Typography>
            <Typography component="time">Enviado em: {data.enviadoEm}</Typography>
          </Box>
        </Box>
        <Divider sx={{ width: '100%' }} />
        <Button
          component={Link}
          to="https://www.gmail.com"
          sx={{
            whiteSpace: 'nowrap',
            alignSelf: 'start',
            marginBottom: '1rem',
            marginLeft: '1rem',
          }}
        >
          Verifique seu email
        </Button>
      </Paper>
    </List>
  );
};

NotificationsItem.propTypes = {
  data: PropTypes.object,
};

export default NotificationsItem;
