import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  Typography,
} from '@mui/material';

const Challenge = () => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: '15.75rem',
        height: '18.375rem',
        position: 'relative',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        flexGrow: '1',
        margin: '0 1% 24px',
      }}
    >
      <Box sx={{ background: '#2563eb', width: '100%', height: '5rem' }}></Box>

      <Avatar
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
        <Typography fontSize="0.9rem">Leonardo Lucena</Typography>
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
          <ListItem sx={{ gap: '0.5rem', padding: '0' }}>
            <Typography component="time">16h</Typography>
            <Typography component="span">-</Typography>
            <Typography>Sistema Senha</Typography>
          </ListItem>
          <ListItem sx={{ gap: '0.5rem', padding: '0' }}>
            <Typography component="time">22h</Typography>
            <Typography component="span">-</Typography>
            <Typography>Jogo DOTS</Typography>
          </ListItem>
          <ListItem sx={{ gap: '0.5rem', padding: '0' }}>
            <Typography component="time">16 dez</Typography>
            <Typography component="span">-</Typography>
            <Typography>Lista de Exercício</Typography>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default Challenge;
