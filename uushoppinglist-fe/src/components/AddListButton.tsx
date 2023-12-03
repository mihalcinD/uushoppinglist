import { Box, Button, Chip, Fab, IconButton, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import ModalBox from './Modal.tsx';
import { useListsContext } from '../context/ListsContext.tsx';
import { useAuth0, User } from '@auth0/auth0-react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const AddListButton = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [items, setItems] = useState<{ name: string }[]>();
  const { user } = useAuth0();
  const [members, setMembers] = useState<{ id: string; name: string }[] | undefined>([
    { id: (user as User).sub ?? '', name: (user as User).name ?? '' },
  ]);
  const [error, setError] = useState<boolean>(false);
  const { addList } = useListsContext();
  return (
    <>
      <Fab color="primary" aria-label="add" sx={{ alignSelf: 'flex-end' }} onClick={() => setIsVisible(true)}>
        <AddIcon />
      </Fab>
      <ModalBox open={isVisible} handleClose={() => setIsVisible(false)} title={'Create new list'}>
        <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} mt={5}>
          <TextField
            label="Name"
            value={name}
            error={error}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setError(false);
              setName(event.target.value);
            }}
          />
          <Button
            variant={'outlined'}
            onClick={() => {
              setItems(items => {
                if (items) return [...items, { name: 'Item Name' }];
                else return [{ name: 'Item Name' }];
              });
            }}
            color={'primary'}>
            Add Item
          </Button>
        </Box>

        <Box display={'flex'} flexDirection={'column'} mt={5}>
          {items &&
            items.map((item, index) => (
              <Box
                key={index}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                width={'100%'}
                sx={{ borderBottom: 1, borderColor: 'grey.500' }}
                py={1}>
                <Typography
                  sx={{ verticalAlign: 'center' }}
                  suppressContentEditableWarning={true}
                  contentEditable={true}
                  onBlur={e => {
                    setItems(prevState => {
                      if (prevState)
                        return prevState.map((_item, _index) => {
                          if (_index === index) return { name: e.target.innerText || '' };
                          return _item;
                        });
                    });
                  }}>
                  {item.name}
                </Typography>
                <IconButton
                  onClick={() => {
                    setItems(items => items?.filter((_, i) => i !== index));
                  }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
        </Box>

        <Box display={'flex'} mt={10}>
          <Button
            variant={'outlined'}
            onClick={() => {
              setMembers(members => {
                if (members)
                  return [
                    ...members,
                    {
                      id: Array(30)
                        .fill('')
                        .map(() => Math.random().toString(36).charAt(2))
                        .join(''),
                      name: 'test' + (members.length + 1) + '@test.com',
                    },
                  ];
              });
            }}
            color={'primary'}>
            Add member
          </Button>
        </Box>
        <Box display={'flex'} flexDirection={'row'} gap={2} flexWrap={'wrap'} mt={4}>
          {members &&
            members.map((member, index) => (
              <Chip
                icon={<AccountCircleIcon />}
                label={member.name}
                key={index}
                onDelete={
                  member.id !== user?.sub
                    ? () => {
                        setMembers(members?.filter(user => user.id !== member.id));
                      }
                    : undefined
                }
              />
            ))}
        </Box>
        <Box display={'flex'} justifyContent={'flex-end'} mt={4}>
          <Button
            variant={'contained'}
            onClick={() => {
              if (name && name !== '')
                addList(name, items, members?.map(member => member.id))
                  .then(() => {
                    setName('');
                    setMembers([{ id: (user as User).sub ?? '', name: (user as User).name ?? '' }]);
                    setItems([]);
                    setIsVisible(false);
                  })
                  .catch(err => {
                    console.log(err);
                    setError(true);
                  });
              else setError(true);
            }}
            color={'primary'}>
            Save
          </Button>
        </Box>
      </ModalBox>
    </>
  );
};

export default AddListButton;
