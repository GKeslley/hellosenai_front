import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '85vw',
  maxWidth: '600px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ModalComponent = ({ children, handleClose, openModal, sx }) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
        sx={sx}
      >
        <Fade in={openModal}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalComponent;

ModalComponent.propTypes = {
  children: PropTypes.string,
  handleClose: PropTypes.func,
  openModal: PropTypes.bool,
  sx: PropTypes.object,
};
