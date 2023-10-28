import { Box, Button, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Box gap={10} display={'flex'} flexDirection={'column'} alignItems={'center'}>
      <Typography variant="h3" component={'h1'}>
        To continue to the app you have to login
      </Typography>
      <Button variant={'contained'} onClick={() => loginWithRedirect()}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
