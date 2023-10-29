import { Auth0Provider } from '@auth0/auth0-react';
import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

type Props = {
  children: JSX.Element;
};
const ContextsContainer = ({ children }: Props) => {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <Auth0Provider
        domain="dev-4ojfaid8tmaplkrp.us.auth0.com"
        clientId="sg6O1UtekVdCSt56cD0DB7VRYTqxGhc8"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}>
        <CssBaseline />
        {children}
      </Auth0Provider>
    </ThemeProvider>
  );
};

export default ContextsContainer;
