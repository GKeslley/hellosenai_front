import { Card, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalCreateInvite from '../../../Invites/Modal/ModalCreateInvite';

const ProfileInvite = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const openDialogEditProject = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <Card sx={{ flex: '1', minWidth: '250px', height: 'max-content' }}>
        <CardContent>
          <Typography
            variant="body2"
            marginBottom="0.3rem"
            fontSize="1.2rem"
            fontWeight="500"
          >
            Facebook
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to cook together
            with your guests. Add 1 cup of frozen peas along with the mussels, if you
            like.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="edit project" onClick={openDialogEditProject}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete project">
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>

      <ModalCreateInvite
        openModal={openDialog}
        setOpenModal={setOpenDialog}
        title="Editar Projeto"
        buttonTitle="Atualizar"
      />
    </>
  );
};

export default ProfileInvite;
