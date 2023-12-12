import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

const SidebarInfos = ({ data }) => {
  const { data: newsChallenges } = useQuery('newChallenges', () => {
    return axios
      .get('http://127.0.0.1:8000/api/v1/desafio?limit=3')
      .then((response) => response.data);
  });

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}
    >
      <Typography>Novos Desafios</Typography>
      <List sx={{ display: 'flex', flexDirection: 'column', padding: '0' }}>
        {newsChallenges &&
          newsChallenges.data.map(({ desafio }, i) => (
            <ListItem key={desafio.slug} disablePadding>
              <ListItemButton sx={{ paddingLeft: '0', gap: '0.5rem' }}>
                <Box
                  sx={{
                    background: i % 2 == 0 ? '#ffd400' : '#00c6d7',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                  }}
                ></Box>
                <ListItemText
                  primary={desafio.titulo}
                  sx={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    maxWidth: '15ch',
                    overflow: 'hidden',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Divider />
      <Typography>Professores Cadastrados</Typography>
      <List sx={{ display: 'flex', flexDirection: 'column', padding: '0' }}>
        {data &&
          data.data.map(({ nome, apelido }) => (
            <ListItem key={apelido} disablePadding>
              <ListItemButton sx={{ paddingLeft: '0', gap: '0.5rem' }}>
                <Avatar sx={{ width: '30px', height: '30px' }} />
                <ListItemText
                  primary={nome}
                  sx={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    maxWidth: '15ch',
                    overflow: 'hidden',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );
};

SidebarInfos.propTypes = {
  data: PropTypes.object,
};

export default SidebarInfos;
