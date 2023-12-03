import { Box, Typography } from '@mui/material';
import ContentWrapper from '../components/ContentWrapper.tsx';
import SegmentedButtons from '../components/SegmentedButtons.tsx';
import AddListButton from '../components/AddListButton.tsx';
import ListsGrid from '../components/ListsGrid.tsx';
import { useListsContext } from '../context/ListsContext.tsx';
import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
const Home = () => {
  const { isLoading, lists, setFilter } = useListsContext();
  const { t } = useTranslation();

  useEffect(() => {}, []);

  return (
    <ContentWrapper>
      <Typography variant="h2" component={'h1'} sx={{ fontWeight: '600', textAlign: 'left' }}>
        {t('home.title')}
      </Typography>
      <Box
        display={'flex'}
        sx={{
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
        }}
        justifyContent={'space-between'}
        gap={2}>
        <SegmentedButtons
          fullWidth
          isLoading={false}
          actions={[
            {
              label: t('home.filter-all'),
              value: 'all',
              onSelect: () => {
                setFilter('all');
              },
            },
            {
              label: t('home.filter-owner'),
              value: 'owner',
              onSelect: () => {
                setFilter('owner');
              },
            },
            {
              label: t('home.filter-member'),
              value: 'member',
              onSelect: () => {
                setFilter('member');
              },
            },
            {
              label: t('home.filter-archived'),
              value: 'archived',
              onSelect: () => {
                setFilter('archived');
              },
            },
          ]}
        />
        <AddListButton />
      </Box>
      <ListsGrid lists={lists} isLoading={isLoading} />
    </ContentWrapper>
  );
};

export default Home;
