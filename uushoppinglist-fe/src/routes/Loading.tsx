import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Loading = () => {
  const { t } = useTranslation();
  return (
    <Box
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      width={'100vw'}
      height={'100vh'}
      sx={{ backgroundColor: 'background.default' }}>
      <Typography variant="h3" component={'h1'}>
        {t('loading.title')}
      </Typography>
    </Box>
  );
};

export default Loading;
