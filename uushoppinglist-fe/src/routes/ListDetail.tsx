import ContentWrapper from '../components/ContentWrapper.tsx';
import ListName from '../components/ListName.tsx';
import useList from '../hooks/useList.ts';
import SegmentedButtons from '../components/SegmentedButtons.tsx';
import { Box } from '@mui/material';
import ItemsList from '../components/ItemsList.tsx';
import ButtonsGroup from '../components/ButtonsGroup.tsx';
import { useParams } from 'react-router-dom';

const ListDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { list, isLoading, setName, addItem, removeItem, setItemName, setFilter, setChecked, removeMember, addMember } =
    useList({
      id,
    });

  return (
    <ContentWrapper>
      <ListName name={list?.name} isOwner={list?.isOwner} id={list?._id} isLoading={isLoading} setName={setName} />
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
        <SegmentedButtons
          isLoading={isLoading}
          actions={[
            {
              label: 'All',
              value: 'all',
              onSelect: () => {
                setFilter('all');
              },
            },
            {
              label: 'To buy',
              value: 'to-buy',
              onSelect: () => {
                setFilter('notDone');
              },
            },
          ]}
        />
        <ButtonsGroup
          isLoading={isLoading}
          addItem={addItem}
          members={list?.membersIDs}
          onUserDelete={removeMember}
          onMemberAdd={addMember}
          ownerID={list?.ownerID}
        />
      </Box>
      <ItemsList
        items={list?.items}
        setChecked={setChecked}
        isLoading={isLoading}
        deleteItem={removeItem}
        setItemName={setItemName}
      />
    </ContentWrapper>
  );
};

export default ListDetail;
