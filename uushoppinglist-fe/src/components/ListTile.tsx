import { Box, Card, Typography, CardActionArea } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MoreButton from './MoreButton.tsx';
import { useNavigate } from 'react-router-dom';
import { useListsContext } from '../context/ListsContext.tsx';

type Props = {
  isOwner: boolean;
  name: string;
  id: string;
  isArchived: boolean;
};
const ListTile = ({ isOwner, name, id, isArchived }: Props) => {
  const navigate = useNavigate();
  const { deleteList, setArchived } = useListsContext();
  return (
    <Grid xs={12} sm={6} md={4}>
      <Card sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box
          display={'flex'}
          justifyContent={'space-between'}
          flexDirection={'row'}
          alignItems={'center'}
          px={2}
          py={1.5}>
          <Typography variant={'h5'} component={'h3'} sx={{ textAlign: 'left' }}>
            {name}
          </Typography>
          {isOwner && (
            <MoreButton
              actions={[
                ...(!isArchived ? [{ name: 'Archive', action: () => setArchived(id, true) }] : []),
                { name: 'Delete', action: () => deleteList(id) },
              ]}
            />
          )}
        </Box>
        <CardActionArea onClick={() => navigate('/list/' + id)} disabled={isArchived} sx={{ height: '100%' }}>
          <Box p={2} pt={3}>
            <Typography>{isArchived ? 'Archived' : 'Show detail'}</Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ListTile;
