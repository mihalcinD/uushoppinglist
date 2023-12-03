import TranslateIcon from '@mui/icons-material/Translate';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { useTranslateContext } from '../context/TranslateContext.tsx';

const LanguageButton = () => {
  const [anchorMenu, setMenu] = useState<HTMLElement>();
  const { locales, setLanguageAndSave, language } = useTranslateContext();
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
        {locales.map((locale, index) => (
          <MenuItem
            key={index}
            selected={language === locale.code}
            onClick={() => {
              setLanguageAndSave(locale.code);
              handleCloseMenu();
            }}>
            <Typography textAlign="center">{locale.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageButton;
