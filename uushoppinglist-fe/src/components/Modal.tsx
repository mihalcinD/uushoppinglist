import { Box, Typography, Modal } from '@mui/material';

type Props = {
  open: boolean;
  handleClose: () => void;
  title: string;
  children: JSX.Element[] | JSX.Element;
};
const ModalBox = ({ open, handleClose, title, children }: Props) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-title" variant="h4" component="h2" sx={{ fontWeight: '600', marginBottom: 2 }}>
          {title}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 5,
  width: { xs: '90%', sm: '70%', md: '50%' },
  maxHeight: '90%',
  overflow: 'auto',
  p: 4,
};

export default ModalBox;
