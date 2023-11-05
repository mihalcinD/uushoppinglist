import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import ModalBox from './Modal.tsx';

const AddListButton = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <>
      <Fab color="primary" aria-label="add" sx={{ alignSelf: 'flex-end' }} onClick={() => setIsVisible(true)}>
        <AddIcon />
      </Fab>
      <ModalBox open={isVisible} handleClose={() => setIsVisible(false)} title={'Create new list'}></ModalBox>
    </>
  );
};

export default AddListButton;
