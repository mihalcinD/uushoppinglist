import ContentWrapper from '../components/ContentWrapper.tsx';
import ListName from '../components/ListName.tsx';
import useList from '../hooks/useList.ts';
import SegmentedButtons from '../components/SegmentedButtons.tsx';
import { Box } from '@mui/material';

const ListDetail = () => {
  const { list, isLoading, setName, getUnCheckedItems, getAllItems } = useList();
  return (
    <ContentWrapper>
      <ListName name={list.name} isOwner={list.isOwner} id={list.id} isLoading={isLoading} setName={setName} />
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
        <SegmentedButtons
          isLoading={isLoading}
          actions={[
            {
              label: 'All',
              value: 'all',
              onSelect: () => {
                getAllItems();
              },
            },
            {
              label: 'To buy',
              value: 'to-buy',
              onSelect: () => {
                getUnCheckedItems();
              },
            },
          ]}
        />
      </Box>
    </ContentWrapper>
  );
};

export default ListDetail;
