import { Typography } from '@mui/material';
import ContentWrapper from '../components/ContentWrapper.tsx';

const ListDetail = () => {
  return (
    <ContentWrapper>
      <Typography variant="h1" component={'h1'} sx={{ fontWeight: '500' }}>
        Shopping List 1
      </Typography>
    </ContentWrapper>
  );
};

export default ListDetail;
