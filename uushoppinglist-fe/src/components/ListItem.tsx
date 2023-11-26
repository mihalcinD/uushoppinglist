import { Box, Typography, Checkbox } from '@mui/material';
import { ListItem as ListItemType } from '../types/List.ts';
import MoreButton from './MoreButton.tsx';

type Props = {
  item: ListItemType;
  setChecked: (id: string, checked: boolean) => void;
  deleteItem: (id: string) => void;
  setItemName: (name: string, id: string) => void;
};
const ListItem = ({ item, setChecked, deleteItem, setItemName }: Props) => {
  return (
    <Box
      display={'flex'}
      flexDirection={'row'}
      alignItems={'center'}
      justifyContent={'space-between'}
      px={2}
      py={2}
      sx={{ borderBottom: 1, borderColor: 'grey.500' }}>
      <Typography
        sx={{ ...(item.isDone ? { textDecoration: 'line-through' } : {}) }}
        suppressContentEditableWarning={true}
        contentEditable={true}
        onBlur={e => {
          setItemName(e.target.innerText || '', item._id);
        }}>
        {item.name}
      </Typography>
      <Box display={'flex'} flexDirection={'row'} gap={2} alignItems={'center'}>
        <MoreButton actions={[{ name: 'Delete', action: () => deleteItem(item._id) }]} />
        <Checkbox
          defaultChecked={item.isDone}
          onChange={(event, checked) => {
            event.preventDefault();
            setChecked(item._id, checked);
          }}
        />
      </Box>
    </Box>
  );
};

export default ListItem;
