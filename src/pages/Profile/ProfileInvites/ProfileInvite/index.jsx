import {
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalCreateInvite from '../../../Invites/Modal/ModalCreateInvite';
import PropTypes from 'prop-types';

const ProfileInvite = ({ title, description, slug, actions = true }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const openDialogEditProject = () => {
    setOpenDialog(true);
  };

  return (
    <>
      {
        <Grid
          item
          component={Card}
          xs
          minWidth="250px"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <CardContent>
            <Typography
              variant="body2"
              marginBottom="0.3rem"
              fontSize="1.2rem"
              fontWeight="500"
            >
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description.slice(0, 60)}
            </Typography>
          </CardContent>
          {actions && (
            <CardActions disableSpacing>
              <IconButton aria-label="edit project" onClick={openDialogEditProject}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete project">
                <DeleteIcon />
              </IconButton>
            </CardActions>
          )}
        </Grid>
      }

      {openDialog && (
        <ModalCreateInvite
          openModal={openDialog}
          setOpenModal={setOpenDialog}
          title="Editar Convite"
          buttonTitle="Atualizar"
          inviteTitle={title}
          inviteDescription={description}
          inviteSlug={slug}
        />
      )}
    </>
  );
};

ProfileInvite.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  slug: PropTypes.string,
  actions: PropTypes.bool,
};

export default ProfileInvite;
