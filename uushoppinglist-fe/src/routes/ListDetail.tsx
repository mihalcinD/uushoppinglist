import { Typography } from '@mui/material';
import ContentWrapper from '../components/ContentWrapper.tsx';
import ListName from '../components/ListName.tsx';
import useList from '../hooks/useList.ts';

const ListDetail = () => {
  const { list, isLoading } = useList();
  return (
    <ContentWrapper>
      <ListName name={list.name} isOwner={list.isOwner} id={list.id} isLoading={isLoading} />
    </ContentWrapper>
  );
};

export default ListDetail;
