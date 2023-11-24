import { Avatar, Box, Container, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import Title from '../../components/Title';
import Challenge from './Challenge';

const Challenges = () => {
  return (
    <Container component='section' sx={{ display: 'grid', gridTemplateColumns: '1fr auto', 
    marginBottom: '2rem', gap: '1rem' }}>
      <Box sx={{display: 'flex', flexWrap: 'wrap' }}>
        <Challenge />
        <Challenge />
        <Challenge />
        <Challenge />
        <Box
          sx={{
            height: 0,
            width: '15.75rem',
            minWidth: '15.75rem',
            flexGrow: '1',
            margin: '0 1% 24px',
            marginTop: 0,
            marginBottom: 0,
          }}
        ></Box>
        <Box
          sx={{
            height: 0,
            width: '15.75rem',
            minWidth: '15.75rem',
            flexGrow: '1',
            margin: '0 1% 24px',
            marginBottom: 0,
            marginTop: 0,
          }}
        ></Box>
        <Box
          sx={{
            height: 0,
            width: '15.75rem',
            minWidth: '15.75rem',
            flexGrow: '1',
            margin: '0 1% 24px',
            marginBottom: 0,
            marginTop: 0,
          }}
        ></Box>
      </Box>  

      <Box component='section' sx={{display: 'grid', gridTemplateRows: 'auto 1fr', background: '#f7f7f7',
      padding: '1rem', maxHeight: 'max-content'}}>
        <Typography>Novos Desafios</Typography>
        <List sx={{width: '12rem', display: 'flex', flexDirection: 'column', gap: '0.3rem'}}>
          <ListItem sx={{paddingLeft: '0'}}>
            <ListItemAvatar sx={{minWidth: '3rem'}}>
              <Avatar sx={{width: '30px', height: '30px'}} />
            </ListItemAvatar>
            <ListItemText
              primary="Jogo da Velha"
            />
          </ListItem>

          <Divider variant="middle" component="li" />


          <ListItem sx={{paddingLeft: '0'}}>
            <ListItemAvatar sx={{minWidth: '3rem'}}>
              <Avatar sx={{width: '30px', height: '30px'}} />
            </ListItemAvatar>
            <ListItemText
              primary="Jogo da Velha"
            />
          </ListItem>

          <Divider variant="middle" component="li" />
        </List>
      </Box>
    </Container>
  );
};

export default Challenges;
