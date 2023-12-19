import React from 'react';
import {
  Typography,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';

const invites = [
  {
    label: 'Facebook',
    autor: 'lekzin',
  },
  {
    label: 'Google INOVA',
    autor: 'filipe',
  },
  {
    label: 'Classroom 2',
    autor: 'madrugain',
  },
  {
    label: 'FMAIL',
    autor: 'peo',
  },
];

const Invites = () => {
  return (
    <List
      className="grid"
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
    >
      {invites.map(({ autor, label }, i) => (
        <Box key={i}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <AccountCircleIcon />
            </ListItemAvatar>
            <ListItemText
              primary="Convite"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {autor}
                  </Typography>
                  {` — ${label}...`}
                </React.Fragment>
              }
            />
          </ListItem>
          {i != invites.length - 1 ? <Divider variant="inset" component="li" /> : ''}
        </Box>
      ))}
      <Link className="block text-end py-1 px-5 color-blue-header underline w-max justify-self-end">
        Mais Convites
      </Link>
    </List>
  );
};

export default Invites;
