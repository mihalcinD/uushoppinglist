import { Typography, Skeleton, Box, IconButton, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';

type Props = {
  id?: string;
  name?: string;
  isOwner?: boolean;
  isLoading?: boolean;
  setName: (name: string) => void;
};
const ListName = ({ name, isOwner, isLoading, setName }: Props) => {
  const [value, setValue] = useState<string | undefined>(name);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const submit = () => {
    if (value) {
      setIsEditing(false);
      setName(value);
    }
  };

  return (
    <>
      {isLoading ? (
        <Skeleton variant="rounded" width={500} height={64} />
      ) : (
        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={2}>
          {isEditing ? (
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
              {name}
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
      )}
    </>
  );
};

export default ListName;
