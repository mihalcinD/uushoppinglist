import { Box, Button, Typography } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const { t } = useTranslation();
  return (
    <Box
      gap={5}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100vw'}
      height={'100vh'}>
      <Typography variant="h4" component={'h1'}>
        {t('login.title')}
      </Typography>
      <Button variant={'contained'} onClick={() => loginWithRedirect()}>
        {t('login.button')}
      </Button>
    </Box>
  );
};

export default Login;
