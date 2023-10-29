import ContentWrapper from '../components/ContentWrapper.tsx';
import ListName from '../components/ListName.tsx';
import useList from '../hooks/useList.ts';
import SegmentedButtons from '../components/SegmentedButtons.tsx';

const ListDetail = () => {
  const { list, isLoading } = useList();
  return (
    <ContentWrapper>
      <ListName name={list.name} isOwner={list.isOwner} id={list.id} isLoading={isLoading} />
      <SegmentedButtons
        isLoading={isLoading}
        actions={[
          { label: 'All', value: 'all', onSelect: () => {} },
          { label: 'To buy', value: 'to-buy', onSelect: () => {} },
        ]}
      />
    </ContentWrapper>
  );
};

export default ListDetail;
