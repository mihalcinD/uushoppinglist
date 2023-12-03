import { AppBar, Box, IconButton, Menu, MenuItem, Stack, Toolbar, Typography } from '@mui/material';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { useState, MouseEvent } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useThemeContext } from '../context/ThemeContext.tsx';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LanguageButton from './LanguageButton.tsx';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const { logout, user } = useAuth0();
  const { toggleMode, mode } = useThemeContext();
  const { t } = useTranslation();
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          justifyContent: 'space-between',
        }}>
        <Stack direction={'row'} gap={1}>
          <IconButton size="large" onClick={toggleMode} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <LanguageButton />
        </Stack>

        <IconButton size="large" color="inherit" onClick={handleOpenUserMenu}>
          <PermIdentityOutlinedIcon />
        </IconButton>

        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}>
          <Box px={2} pt={1} pb={2}>
            <Typography textAlign="center">{user?.email}</Typography>
          </Box>
          <MenuItem onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            <Typography textAlign="center">{t('header.logout-button')}</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
