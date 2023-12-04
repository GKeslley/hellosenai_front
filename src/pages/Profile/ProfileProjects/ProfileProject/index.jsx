import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DialogCreateProject from '../../../Projects/DialogCreateProject';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileProject = ({ name, description, participants, status, slug, image }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const openDialogEditProject = () => {
    setOpenDialog(true);
  };
  return (
    <>
      <Card sx={{ flex: '1', minWidth: '250px' }}>
        <Link to={`/projetos/${slug}`}>
          <CardMedia
            component="img"
            sx={{ height: 150 }}
            src={`http://127.0.0.1:8000${image}`}
            alt="Paella dish"
          />
        </Link>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {name}
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
          dataEditProject={{ name, description, participants, status, image, slug }}
          title="Editar Projeto"
        />
      )}
    </>
  );
};

ProfileProject.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  participants: PropTypes.array,
  status: PropTypes.string,
  slug: PropTypes.string,
  image: PropTypes.string,
};

export default ProfileProject;
