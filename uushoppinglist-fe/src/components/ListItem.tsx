import { Box, Typography, Checkbox } from '@mui/material';
import { ListItem as ListItemType } from '../types/List.ts';
import MoreButton from './MoreButton.tsx';

type Props = {
  item: ListItemType;
  setChecked: (id: string, checked: boolean) => void;
  deleteItem: (id: string) => void;
};
const ListItem = ({ item, setChecked, deleteItem }: Props) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      px={2}
      py={2}
      sx={{ borderBottom: 1, borderColor: 'grey.500' }}>
      <Typography sx={{ ...(item.checked ? { textDecoration: 'line-through' } : {}) }}>{item.name}</Typography>
      <Box display={'flex'} flexDirection={'row'} gap={2} alignItems={'center'}>
        <MoreButton deleteItem={() => deleteItem(item.id)} />
        <Checkbox
          defaultChecked={item.checked}
          onChange={(event, checked) => {
            setChecked(item.id, checked);
          }}
        />
      </Box>
    </Box>
  );
};

export default ListItem;