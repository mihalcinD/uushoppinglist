import TranslateIcon from '@mui/icons-material/Translate';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { MouseEvent, useState } from 'react';

const LanguageButton = () => {
  const [anchorMenu, setMenu] = useState<HTMLElement>();
  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setMenu(undefined);
  };
  return (
    <>
      <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
        <TranslateIcon />
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handleCloseMenu}
        open={Boolean(anchorMenu)}>
        <MenuItem
          onClick={() => {
            handleCloseMenu();
          }}>
          <Typography textAlign="center">English</Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageButton;
