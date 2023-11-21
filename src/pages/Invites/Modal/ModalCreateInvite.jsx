import ModalComponent from '../../../components/Modal';
import { Container, Divider, ListItem, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ButtonComponent from '../../../components/Button';
import MultiSelect from '../../../components/Form/MultiSelect';

const ModalCreateInvite = ({ openModal, setOpenModal, title, buttonTitle }) => {
  return (
    <ModalComponent openModal={openModal} setOpenModal={setOpenModal}>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ListItem>
          <Typography variant="h4" fontWeight="500" fullWidth>
            {title}
          </Typography>
        </ListItem>
        <Divider />

        <ListItem>
          <TextField required id="title-required" fullWidth label="Título" />
        </ListItem>

        <ListItem>
          <TextField
            id="description-multiline"
            required
            fullWidth
            label="Descrição"
            multiline
            minRows={5}
            variant="outlined"
          />
        </ListItem>

        <ListItem sx={{ width: '100%' }}>
          <MultiSelect label="Tags" placeholder="Tag" />
        </ListItem>

        <ButtonComponent sx={{ alignSelf: 'end' }} size="large">
          {buttonTitle}
        </ButtonComponent>
      </Container>
    </ModalComponent>
  );
};

ModalCreateInvite.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
  title: PropTypes.string,
  buttonTitle: PropTypes.string,
};

export default ModalCreateInvite;
