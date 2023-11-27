import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { Dialog, IconButton, List, useMediaQuery } from '@mui/material';
import { Close } from '@mui/icons-material';

const ModalComponent = ({ children, openModal, setOpenModal }) => {
  const isSmallSmartphone = useMediaQuery('(min-width: 500px)');
  const handleClose = () => setOpenModal(false);

  return (
    <div>
      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleClose}
        maxWidth="sm"
        sx={{
          '& .MuiDialog-container': {
            '& .MuiPaper-root': {
              minWidth: !isSmallSmartphone ? '100vw' : '85vw',
              minHeight: !isSmallSmartphone ? '100vh' : 'auto',
            },
          },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            zIndex: '100',
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <List sx={{ p: '1rem 0' }}>
          <Box>{children}</Box>
        </List>
      </Dialog>
    </div>
  );
};

export default ModalComponent;

ModalComponent.propTypes = {
  children: PropTypes.object,
  setOpenModal: PropTypes.func,
  openModal: PropTypes.bool,
  sx: PropTypes.object,
};
