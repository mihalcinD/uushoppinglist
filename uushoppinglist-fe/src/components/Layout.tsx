import { Outlet } from 'react-router-dom';
import Header from './Header.tsx';
import AuthorizedContextsContainer from '../context/AuthorizedContextsContainer.tsx';

const Layout = () => {
  return (
    <AuthorizedContextsContainer>
      <Header />
      <Outlet />
    </AuthorizedContextsContainer>
  );
};

export default Layout;
