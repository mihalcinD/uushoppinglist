import { IconButton, Skeleton, Box, Button, Stack, Chip } from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ModalBox from './Modal.tsx';
import { useState } from 'react';
import { User } from '../types/List.ts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

type Props = {
  isLoading: boolean;
  members?: User[];
  onDeleteUser: (id: string) => void;
};
const MembersButton = ({ isLoading, members, onDeleteUser }: Props) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <>
      {isLoading ? (
        <Skeleton variant="circular" width={52} height={52} />
      ) : (
        <IconButton aria-label="members" size="large" onClick={() => setOpen(true)}>
          <PeopleAltOutlinedIcon fontSize="inherit" />
        </IconButton>
      )}
      <ModalBox open={open} handleClose={handleClose} title={'Members'}>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'} width={'100%'} mb={2}>
          <Button variant={'outlined'} onClick={() => {}}>
            Add Member
          </Button>
        </Box>

        <Stack direction="row" spacing={1}>
          {members &&
            members.map((member, index) => (
              <Chip
                icon={<AccountCircleIcon />}
                label={member.name}
                key={index}
                onDelete={() => {
                  onDeleteUser(member.id);
                }}
              />
            ))}
        </Stack>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} width={'100%'} mt={15}>
          <Button variant={'contained'} onClick={() => {}} color={'error'}>
            Leave
          </Button>
          <Button variant={'outlined'} onClick={handleClose}>
            close
          </Button>
        </Box>
      </ModalBox>
    </>
  );
};

export default MembersButton;
