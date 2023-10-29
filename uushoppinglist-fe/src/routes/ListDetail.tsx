import { Typography } from '@mui/material';
import ContentWrapper from '../components/ContentWrapper.tsx';
import ListName from '../components/ListName.tsx';

const ListDetail = () => {
  return (
    <ContentWrapper>
      <ListName name={'Shopping list 1'} isOwner={true} id={'xx'} isLoading={false} />
    </ContentWrapper>
  );
};

export default ListDetail;
