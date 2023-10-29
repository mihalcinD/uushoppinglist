import { Typography, Skeleton, Box, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';

type Props = {
  id: string;
  name: string;
  isOwner: boolean;
  isLoading: boolean;
};
const ListName = ({ name, isOwner, isLoading = false }: Props) => {
  const [value, setValue] = useState<string>(name);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const submit = () => {
    setIsEditing(false);
    //send edited
  };

  return (
    <Box display={'flex'} flexDirection={'row'} gap={3} alignItems={'center'}>
      {isLoading ? (
        <Skeleton variant="text" sx={{ fontSize: '4rem' }} width={400} />
      ) : isEditing ? (
        <TextField
          id="outlined-basic"
          variant="standard"
          value={value}
          onChange={onChange}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              submit();
              e.preventDefault();
            }
          }}
        />
      ) : (
        <Typography variant="h2" component={'h1'} sx={{ fontWeight: '600' }}>
          {value}
        </Typography>
      )}
      {isOwner && (
        <IconButton
          aria-label="edit"
          size="large"
          onClick={() =>
            setIsEditing(prevState => {
              if (prevState) {
                submit();
              }
              return !prevState;
            })
          }>
          <EditIcon fontSize="inherit" />
        </IconButton>
      )}
    </Box>
  );
};

export default ListName;
