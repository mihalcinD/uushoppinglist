import { Box, Typography } from '@mui/material';

const Loading = () => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100vw'}
      height={'100vh'}
      sx={{ backgroundColor: 'background.default' }}>
      <Typography variant="h3" component={'h1'}>
        Authentication in progress...
      </Typography>
    </Box>
  );
};

export default Loading;
