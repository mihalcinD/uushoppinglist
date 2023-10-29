import { ListItem as ListItemType } from '../types/List.ts';
import { Box, Skeleton } from '@mui/material';
import ListItem from './ListItem.tsx';

type Props = {
  items: ListItemType[];
  setChecked: (id: string, checked: boolean) => void;
  deleteItem: (id: string) => void;
  isLoading: boolean;
};
const ItemsList = ({ items, setChecked, isLoading, deleteItem }: Props) => {
  return (
    <Box display={'flex'} flexDirection={'column'}>
      {isLoading ? (
        <>
          {[1, 2, 3, 4].map((_, index) => (
            <Skeleton key={index} variant="rounded" width={'100%'} height={75} sx={{ marginBottom: 2 }} />
          ))}
        </>
      ) : (
        <>
          {items.map((item, index) => (
            <ListItem item={item} setChecked={setChecked} key={index} deleteItem={deleteItem} />
          ))}
        </>
      )}
    </Box>
  );
};

export default ItemsList;
