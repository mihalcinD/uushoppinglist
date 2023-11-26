import { Auth0Provider } from '@auth0/auth0-react';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ListsProvider } from './ListsContext.tsx';
import { ApiProvider } from './ApiContext.tsx';

type Props = {
  children: JSX.Element;
};
const ContextsContainer = ({ children }: Props) => {
  let theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  theme = responsiveFontSizes(theme);
  return (
    <ThemeProvider theme={theme}>
      <Auth0Provider
        domain="dev-4ojfaid8tmaplkrp.us.auth0.com"
        clientId="sg6O1UtekVdCSt56cD0DB7VRYTqxGhc8"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}>
        <ApiProvider>
          <ListsProvider>
            <CssBaseline />
            {children}
          </ListsProvider>
        </ApiProvider>
      </Auth0Provider>
    </ThemeProvider>
  );
};

export default ContextsContainer;
