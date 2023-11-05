import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';

const AddListButton = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  return (
    <>
      <Fab color="primary" aria-label="add" sx={{ alignSelf: 'flex-end' }}>
        <AddIcon onClick={() => setIsVisible(prevState => !prevState)} />
      </Fab>
    </>
  );
};

export default AddListButton;
