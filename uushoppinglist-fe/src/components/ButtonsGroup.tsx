import { Box, Fab, Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MembersButton from './MembersButton.tsx';

type Props = {
  isLoading: boolean;
  addItem: () => void;
};
const ButtonsGroup = ({ isLoading, addItem }: Props) => {
  return (
    <Box display={'flex'} flexDirection={'row'} gap={2} alignItems={'center'}>
      <MembersButton isLoading={isLoading} />
      {isLoading ? (
        <Skeleton variant="circular" width={56} height={56} />
      ) : (
        <Fab color="primary" aria-label="add">
          <AddIcon onClick={addItem} />
        </Fab>
      )}
    </Box>
  );
};

export default ButtonsGroup;
