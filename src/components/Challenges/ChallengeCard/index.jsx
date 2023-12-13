import {
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Typography,
  useMediaQuery,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AvatarUser from '../../Avatar';

const ChallengeCard = ({ name, username, challenges, avatar }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: '18.75rem',
        maxWidth: isMobile ? 'auto' : '18.75rem',
        height: '18.375rem',
        position: 'relative',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        flexGrow: '1',
        margin: '0 1% 24px',
      }}
    >
      <Box sx={{ background: '#2563eb', width: '100%', height: '5rem' }}></Box>

      <AvatarUser
        avatar={avatar}
        sx={{
          width: '60px',
          height: '60px',
          position: 'absolute',
          right: '1rem',
          top: '3rem',
        }}
      />

      <Box sx={{ position: 'absolute', top: '1.5rem', color: '#fff', left: '1rem' }}>
        <Typography fontWeight="800" fontSize="1.5rem" lineHeight="1">
          Desafios
        </Typography>
        <Link to={`/desafios/${username}`} fontSize="0.9rem">
          {name}
        </Link>
      </Box>

      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          overflowY: 'auto',
        }}
      >
        <Typography fontSize="0.9rem">Desafios Recentes</Typography>
        <Divider />
        <List
          sx={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', padding: '0' }}
        >
          {challenges.length > 0 &&
            challenges.map(({ desafio }) => (
              <ListItem key={desafio.slug} sx={{ gap: '0.5rem', padding: '0' }}>
                <Typography component="time">{desafio.dataCriacao}</Typography>
                <Typography component="span">-</Typography>
                <Typography>{desafio.titulo}</Typography>
              </ListItem>
            ))}
        </List>
      </CardContent>
    </Card>
  );
};

ChallengeCard.propTypes = {
  name: PropTypes.string,
  username: PropTypes.string,
  challenges: PropTypes.array,
  avatar: PropTypes.string,
};

export default ChallengeCard;
