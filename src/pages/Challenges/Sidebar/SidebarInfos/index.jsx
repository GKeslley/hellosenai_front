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
import PropTypes from 'prop-types';

const SidebarInfos = ({ data }) => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}
    >
      <Typography>Novos Desafios</Typography>
      <List sx={{ display: 'flex', flexDirection: 'column', padding: '0' }}>
        {['Jogo da Velha', 'Sistema Senha'].map((text, i) => (
          <ListItem key={text} disablePadding>
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
                primary={text}
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
