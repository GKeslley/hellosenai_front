import PropTypes from 'prop-types';
import ModalComponent from '../../../components/Modal';
import { Container, ListItem, TextField, Typography } from '@mui/material';
import ButtonComponent from '../../../components/Button';

const ModalAccessInvite = ({ openModalAccessInvite, setOpenModalAccessInvite }) => {
  return (
    <ModalComponent
      openModal={openModalAccessInvite}
      setOpenModal={setOpenModalAccessInvite}
    >
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ListItem
          sx={{ flexDirection: 'column', alignItems: 'start', maxWidth: 'max-content' }}
        >
          <Typography variant="h4" fontWeight="500">
            Projeto Facebook
          </Typography>
          <Typography color="text.secondary" fontSize="0.9rem">
            Autor: @fulano
          </Typography>
        </ListItem>

        <ListItem sx={{ flexDirection: 'column', alignItems: 'start' }}>
          <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
            Descrição
          </Typography>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vel laoreet
            velit, at iaculis nulla. Cras aliquet purus augue, laoreet bibendum tortor
            malesuada eu. Praesent mi enim, vestibulum eu dolor quis, volutpat dapibus
            velit. Sed sit amet commodo lacus. Morbi rutrum eleifend mollis. Nulla
            vulputate in nulla non hendrerit. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Aliquam facilisis congue orci hendrerit congue. Integer
            placerat ultrices auctor. Nullam arcu eros, mattis quis aliquam vitae,
            interdum vel mi. Proin at tempor ipsum, at feugiat tellus. Donec purus eros,
            egestas nec finibus nec, tempor a nisl. Nunc lacus mauris, ornare ultricies
            velit aliquet, ullamcorper commodo felis.
          </Typography>
        </ListItem>

        <ListItem sx={{ flexDirection: 'column', alignItems: 'start' }}>
          <Typography variant="h5" sx={{ marginBottom: '1rem' }}>
            Deseja Participar?
          </Typography>
          <TextField
            id="description-multiline"
            fullWidth
            label="Mensagem"
            placeholder="Desejo participar do projeto..."
            multiline
            minRows={5}
            variant="outlined"
          />
        </ListItem>

        <ButtonComponent sx={{ alignSelf: 'end' }}>Solicitar</ButtonComponent>
      </Container>
    </ModalComponent>
  );
};

ModalAccessInvite.propTypes = {
  openModalAccessInvite: PropTypes.bool,
  setOpenModalAccessInvite: PropTypes.func,
};

export default ModalAccessInvite;
