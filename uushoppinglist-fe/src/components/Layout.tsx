import { Outlet } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';

const Layout = () => {
  const { user, isAuthenticated, loginWithRedirect, isLoading, logout } = useAuth0();

  return (
    <>
      <Outlet />
      {user && <div>{user.name}</div>}
      <Button onClick={() => logout()}>Logout</Button>
    </>
  );
};

export default Layout;
