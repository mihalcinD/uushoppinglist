import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { MouseEvent, useState } from 'react';

type Props = {
  actions: { name: string; action: () => void }[];
};
const MoreButton = ({ deleteItem, actions }: Props) => {
  const [anchorMenu, setMenu] = useState<HTMLElement>();
  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    event.preventDefault();
    console.log('Button clicked');
    setMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setMenu(undefined);
  };
  return (
    <>
      <IconButton
        onMouseDown={event => event.stopPropagation()}
        aria-label="more"
        size="medium"
        onClick={handleOpenMenu}>
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
        {actions.map((action, index) => (
          <MenuItem key={index} onClick={action.action}>
            <Typography textAlign="center">{action.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default MoreButton;
