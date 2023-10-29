import { ListItem as ListItemType } from '../types/List.ts';
import { Box } from '@mui/material';
import ListItem from './ListItem.tsx';

type Props = {
  items: ListItemType[];
  setChecked: (id: string, checked: boolean) => void;
};
const ItemsList = ({ items, setChecked }: Props) => {
  return (
    <Box display={'flex'} flexDirection={'column'}>
      {items.map((item, index) => (
        <ListItem item={item} setChecked={setChecked} key={index} />
      ))}
    </Box>
  );
};

export default ItemsList;
