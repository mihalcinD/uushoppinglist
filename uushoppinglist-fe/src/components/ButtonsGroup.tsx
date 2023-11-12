import { Box, Fab, Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MembersButton from './MembersButton.tsx';
import { User } from '../types/List.ts';

type Props = {
  isLoading: boolean;
  addItem: () => void;
  members?: User[];
  onUserDelete: (id: string) => void;
};
const ButtonsGroup = ({ isLoading, addItem, members, onUserDelete }: Props) => {
  return (
    <Box display={'flex'} flexDirection={'row'} gap={2} alignItems={'center'}>
      <MembersButton isLoading={isLoading} members={members} onDeleteUser={onUserDelete} />
      {isLoading ? (
        <Skeleton variant="circular" width={56} height={56} />
      ) : (
        <Fab color="primary" aria-label="add" onClick={addItem}>
          <AddIcon />
        </Fab>
      )}
    </Box>
  );
};

export default ButtonsGroup;
