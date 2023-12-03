import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import image from '../../../../assets/logo.png';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DialogCreateProject from '../../../Projects/DialogCreateProject';
import { useState } from 'react';

const ProfileProject = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const openDialogEditProject = () => {
    setOpenDialog(true);
  };
  return (
    <>
      <Card sx={{ flex: '1', minWidth: '250px' }}>
        <CardMedia component="img" height="194" src={image} alt="Paella dish" />
        <CardContent>
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

      {openDialog && (
        <DialogCreateProject
          openModal={openDialog}
          setOpenModal={setOpenDialog}
          title="Editar Projeto"
        />
      )}
    </>
  );
};

export default ProfileProject;
