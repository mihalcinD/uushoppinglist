import Grid from '@mui/material/Unstable_Grid2';
import ListTile from './ListTile.tsx';
import { List } from '../types/List.ts';
import { Skeleton, Typography } from '@mui/material';

type Props = {
  lists: List[] | undefined;
  isLoading?: boolean;
};
const ListsGrid = ({ lists, isLoading }: Props) => {
  return (
    <Grid container rowSpacing={5} columnSpacing={5} mt={4}>
      {isLoading ? (
        <>
          {[1, 2, 3].map((_, index) => (
            <Grid key={index} xs={12} sm={6} md={4}>
              <Skeleton variant="rounded" height={128} width={'100%'} sx={{ marginBottom: 2 }} />
            </Grid>
          ))}
        </>
      ) : lists && lists.length > 0 ? (
        lists.map((list, index) => {
          return (
            <ListTile key={index} isArchived={list.isArchived} isOwner={list.isOwner} name={list.name} id={list._id} />
          );
        })
      ) : (
        <Typography variant={'h3'} component={'h3'}>
          No lists available
        </Typography>
      )}
    </Grid>
  );
};

export default ListsGrid;
