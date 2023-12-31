import { Container, Box } from '@mui/material';
type Props = {
  children: JSX.Element[];
};
const ContentWrapper = ({ children }: Props) => {
  return (
    <Container maxWidth={'lg'}>
      <Box py={5} display={'flex'} flexDirection={'column'} gap={5}>
        {children}
      </Box>
    </Container>
  );
};

export default ContentWrapper;
