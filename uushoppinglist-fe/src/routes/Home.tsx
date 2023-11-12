import { Box, Typography } from '@mui/material';
import ContentWrapper from '../components/ContentWrapper.tsx';
import SegmentedButtons from '../components/SegmentedButtons.tsx';
import AddListButton from '../components/AddListButton.tsx';
import ListsGrid from '../components/ListsGrid.tsx';
import { useListsContext } from '../context/ListsContext.tsx';

const Home = () => {
  const { isLoading, lists, getSharedLists, getMyLists, getArchivedLists, getAllLists } = useListsContext();
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
              onSelect: () => {
                getAllLists();
              },
            },
            {
              label: 'Owner',
              value: 'owner',
              onSelect: () => {
                getMyLists();
              },
            },
            {
              label: 'Member',
              value: 'member',
              onSelect: () => {
                getSharedLists();
              },
            },
            {
              label: 'Archived',
              value: 'archived',
              onSelect: () => {
                getArchivedLists();
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
