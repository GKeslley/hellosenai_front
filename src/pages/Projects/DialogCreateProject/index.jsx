import ModalComponent from '../../../components/Modal';
import {
  Box,
  Button,
  Divider,
  ListItem,
  TextField,
  Typography,
  Container,
} from '@mui/material';
import MultiSelect from '../../../components/Form/MultiSelect';
import { CloudUpload } from '@mui/icons-material';
import ButtonComponent from '../../../components/Button';
import PropTypes from 'prop-types';

const DialogCreateProject = ({ openModal, setOpenModal, title }) => {
  return (
    <ModalComponent setOpenModal={setOpenModal} openModal={openModal}>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ListItem>
          <Typography variant="h4" fontWeight="500" fullWidth>
            {title}
          </Typography>
        </ListItem>

        <Divider />

        <ListItem sx={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
          <Box sx={{ display: 'grid', gap: '1.5rem', flexGrow: '1' }}>
            <TextField
              required
              id="outlined-required"
              label="Nome"
              sx={{ width: '100%' }}
            />
            <TextField
              id="outlined-multiline-static"
              label="Descrição"
              multiline
              rows={4}
              sx={{ width: '100%' }}
            />
            <MultiSelect label="Participantes" placeholder="Participante" />
            <TextField
              required
              id="github-link"
              label="Github"
              placeholder="www.github.com"
              sx={{ width: '100%' }}
            />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              paddingLeft: '1rem',
              alignSelf: 'start',
              flexGrow: '1',
              flexBasis: '0',
              minWidth: '20rem',
            }}
          >
            <Typography variant="p" sx={{ marginBottom: '1rem' }}>
              Adicione uma imagem do seu projeto
            </Typography>
            <Button
              component="label"
              variant="contained"
              disableElevation
              startIcon={<CloudUpload />}
            >
              Imagem
              <input type="file" accept="image/*" hidden />
            </Button>
          </Box>
        </ListItem>

        <ButtonComponent variant="outlined" sx={{ alignSelf: 'end' }} size="large">
          Criar
        </ButtonComponent>
      </Container>
    </ModalComponent>
  );
};

DialogCreateProject.propTypes = {
  openModal: PropTypes.bool,
  setOpenModal: PropTypes.func,
  title: PropTypes.string,
};

export default DialogCreateProject;
