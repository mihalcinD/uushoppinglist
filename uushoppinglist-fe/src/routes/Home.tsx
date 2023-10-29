import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100%'}
      height={'100%'}
      sx={{ backgroundColor: 'background.default' }}>
      <Typography variant="h3" component={'h1'} color={'text.primary'}>
        Home
      </Typography>
    </Box>
  );
};

export default Home;
