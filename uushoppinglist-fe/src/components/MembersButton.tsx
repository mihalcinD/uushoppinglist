import { IconButton, Skeleton, Box, Button, Chip } from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ModalBox from './Modal.tsx';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

type Props = {
  isLoading: boolean;
  members?: string[];
  onDeleteUser: (id: string) => void;
  onMemberAdd: (id: string) => void;
  ownerID?: string;
};
const MembersButton = ({ isLoading, members, onDeleteUser, onMemberAdd, ownerID }: Props) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth0();
  const navigate = useNavigate();
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
          <Button
            variant={'outlined'}
            onClick={() => {
              onMemberAdd(
                Array(30)
                  .fill('')
                  .map(() => Math.random().toString(36).charAt(2))
                  .join(''),
              );
            }}>
            Add Member
          </Button>
        </Box>

        <Box display={'flex'} flexDirection="row" flexWrap={'wrap'} gap={1}>
          {members &&
            members.map((member, index) => (
              <Chip
                icon={<AccountCircleIcon />}
                label={member}
                key={index}
                onDelete={
                  member !== user?.sub && user?.sub === ownerID
                    ? () => {
                        onDeleteUser(member);
                      }
                    : undefined
                }
              />
            ))}
        </Box>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} width={'100%'} mt={15}>
          <Button
            variant={'contained'}
            onClick={() => {
              onDeleteUser(user?.sub ?? '');
              handleClose();
              navigate('/');
            }}
            color={'error'}>
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
