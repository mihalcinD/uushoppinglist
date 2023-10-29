import { IconButton, Skeleton } from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

type Props = {
  isLoading: boolean;
};
const MembersButton = ({ isLoading }: Props) => {
  return (
    <>
      {isLoading ? (
        <Skeleton variant="circular" width={52} height={52} />
      ) : (
        <IconButton aria-label="members" size="large" onClick={() => {}}>
          <PeopleAltOutlinedIcon fontSize="inherit" />
        </IconButton>
      )}
    </>
  );
};

export default MembersButton;
