import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';

const InviteParticipants = ({participants, handleClose, open}) => {
    return  <Dialog onClose={handleClose} open={open}>
    <DialogTitle>Participantes Atuais</DialogTitle>
    <List sx={{ pt: 0 }}>
      {participants.map(({nome, apelido, avatar}) => (
        <ListItem disableGutters key={apelido}>
          <ListItemButton component={Link} to={`/usuario/${apelido}`}>
            <ListItemAvatar>
              {avatar ? 
              <Avatar src={`http://localhost:5173${avatar}`}>
              </Avatar> : <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>}
            </ListItemAvatar>
            <ListItemText primary={nome} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Dialog>;
}

export default InviteParticipants