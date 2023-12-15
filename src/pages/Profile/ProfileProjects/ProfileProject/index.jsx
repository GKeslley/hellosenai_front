import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProjectForm from '../../../Projects/ProjectForm';
import { useMutation } from 'react-query';
import axios from 'axios';
import SnackbarRequest from '../../../../components/SnackbarRequest';

const ProfileProject = ({
  name,
  description,
  participants,
  status,
  slug,
  image,
  queryClient,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const mutation = useMutation({
    mutationFn: ({ data, token }) => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      return axios.post(
        `http://127.0.0.1:8000/api/v1/projeto/${slug}?_method=PUT`,
        data,
        config,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProjects'], type: 'active' });
      setOpenSnackbar(true);
      setOpenDialog(false);
    },
    onError: () => {
      setOpenSnackbar(true);
    },
  });

  const openDialogEditProject = () => {
    setOpenDialog(true);
  };

  return (
    <>
      <Card sx={{ flex: '1', minWidth: '250px', margin: '0 1% 24px' }}>
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
        <ProjectForm
          project={{ name, description, participants, status, image, slug }}
          setOpenModal={setOpenDialog}
          openModal={openDialog}
          title="Editar Projeto"
          mutation={mutation}
        />
      )}

      {openSnackbar && (
        <SnackbarRequest
          message={
            mutation.isSuccess
              ? mutation.data.data.message
              : mutation.error.response.data.message
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
          severity={mutation.isSuccess ? 'success' : 'error'}
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
  queryClient: PropTypes.string,
};

export default ProfileProject;
