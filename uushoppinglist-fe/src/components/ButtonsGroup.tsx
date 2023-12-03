import { Box, Fab, Skeleton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MembersButton from './MembersButton.tsx';

type Props = {
  isLoading: boolean;
  addItem: () => void;
  members?: string[];
  onUserDelete: (id: string) => void;
  onMemberAdd: (id: string) => void;
};
const ButtonsGroup = ({ isLoading, addItem, members, onUserDelete, onMemberAdd }: Props) => {
  return (
    <Box display={'flex'} flexDirection={'row'} gap={2} alignItems={'center'}>
      <MembersButton isLoading={isLoading} members={members} onDeleteUser={onUserDelete} onMemberAdd={onMemberAdd} />
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
