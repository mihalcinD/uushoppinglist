import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { MouseEvent, useState } from 'react';

type Props = {
  deleteItem: () => void;
};
const MoreButton = ({ deleteItem }: Props) => {
  const [anchorMenu, setMenu] = useState<HTMLElement>();
  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setMenu(undefined);
  };
  return (
    <>
      <IconButton aria-label="more" size="large" onClick={handleOpenMenu}>
        <MoreVertIcon fontSize="inherit" />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorMenu)}
        onClose={handleCloseMenu}>
        <MenuItem onClick={deleteItem}>
          <Typography textAlign="center">Delete</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MoreButton;
