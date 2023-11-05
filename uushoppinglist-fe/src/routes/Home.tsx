import { Box, Container, Typography } from '@mui/material';
import ContentWrapper from '../components/ContentWrapper.tsx';
import SegmentedButtons from '../components/SegmentedButtons.tsx';
import AddListButton from '../components/AddListButton.tsx';

const Home = () => {
  return (
    <ContentWrapper>
      <Typography variant="h2" component={'h1'} sx={{ fontWeight: '600', textAlign: 'left' }}>
        Your shopping lists
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
              label: 'All',
              value: 'all',
              onSelect: () => {},
            },
            {
              label: 'Owner',
              value: 'owner',
              onSelect: () => {},
            },
            {
              label: 'Member',
              value: 'member',
              onSelect: () => {},
            },
            {
              label: 'Archived',
              value: 'archived',
              onSelect: () => {},
            },
          ]}
        />
        <AddListButton />
      </Box>
    </ContentWrapper>
  );
};

export default Home;
