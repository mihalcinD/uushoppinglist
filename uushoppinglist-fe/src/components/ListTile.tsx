import { Box, Card, Typography, CardActionArea } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MoreButton from './MoreButton.tsx';
import { useNavigate } from 'react-router-dom';
import { useListsContext } from '../context/ListsContext.tsx';
import { useTranslation } from 'react-i18next';

type Props = {
  isOwner: boolean;
  name: string;
  id: string;
  isArchived: boolean;
};
const ListTile = ({ isOwner, name, id, isArchived }: Props) => {
  const navigate = useNavigate();
  const { deleteList, setArchived } = useListsContext();
  const { t } = useTranslation();
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
                ...(!isArchived
                  ? [{ name: t('home.list-tile.archive-button'), action: () => setArchived(id, true) }]
                  : []),
                { name: t('home.list-tile.delete-button'), action: () => deleteList(id) },
              ]}
            />
          )}
        </Box>
        <CardActionArea onClick={() => navigate('/list/' + id)} disabled={isArchived} sx={{ height: '100%' }}>
          <Box p={2} pt={3}>
            <Typography>{isArchived ? t('home.list-tile.archived') : t('home.list-tile.detail-button')}</Typography>
          </Box>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ListTile;
