import {
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
import AvatarUser from '../../../../components/Avatar';
import { Link } from 'react-router-dom';

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
                  component={Link}
                  to={`/desafios/desafio/${desafio.slug}`}
                  sx={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
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
                      display: 'block',
                      whiteSpace: 'nowrap',
                      maxWidth: '15ch',
                      '& .MuiTypography-root': {
                        display: 'block',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                      },
                    }}
                  />
                </Box>
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      <Divider />
      <Typography>Professores Cadastrados</Typography>
      <List sx={{ display: 'flex', flexDirection: 'column', padding: '0' }}>
        {data &&
          data.data.map(({ nome, apelido, avatar }) => (
            <ListItem key={apelido} disablePadding>
              <ListItemButton sx={{ paddingLeft: '0', gap: '0.5rem' }}>
                <Box
                  component={Link}
                  to={`/desafios/${apelido}`}
                  sx={{
                    display: 'flex',
                    gap: '0.5rem',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <AvatarUser avatar={avatar} sx={{ width: '30px', height: '30px' }} />
                  <ListItemText
                    primary={nome}
                    sx={{
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      maxWidth: '15ch',
                      overflow: 'hidden',
                    }}
                  />
                </Box>
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
