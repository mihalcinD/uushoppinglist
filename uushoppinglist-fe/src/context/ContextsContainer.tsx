import { Auth0Provider } from '@auth0/auth0-react';

import CssBaseline from '@mui/material/CssBaseline';
import { JSX } from 'react';
import { ApiProvider } from './ApiContext.tsx';
import { ThemeProvider } from './ThemeContext.tsx';

type Props = {
  children: JSX.Element;
};
const ContextsContainer = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <Auth0Provider
        domain="dev-4ojfaid8tmaplkrp.us.auth0.com"
        clientId="sg6O1UtekVdCSt56cD0DB7VRYTqxGhc8"
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: 'www.uushoppinglist.com',
        }}>
        <ApiProvider>
          <CssBaseline />
          {children}
        </ApiProvider>
      </Auth0Provider>
    </ThemeProvider>
  );
};

export default ContextsContainer;
