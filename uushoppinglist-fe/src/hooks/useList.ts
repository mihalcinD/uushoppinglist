import { useEffect, useState } from 'react';
import { List } from '../types/List.ts';

const UseList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<List>({
    id: 'xx',
    owner: { id: 'xx', name: 'David' },
    members: [
      { id: 'xx', name: 'Jakub' },
      { id: 'xx', name: 'Vlada' },
    ],
    name: 'Shopping List 1',
    archived: false,
    items: [
      {
        id: 'xx',
        name: 'Milk',
        checked: false,
      },
      {
        id: 'yy',
        name: 'Bread',
        checked: true,
      },
    ],
    isOwner: true,
  });

  //method to add item to list just for testing purposes, will be replaced with api call
  const addItem = (name: string) => {
    setList(prevState => {
      return { ...prevState, items: [...prevState.items, { id: 'zz', name, checked: false }] };
    });
  };

  //method to remove item from list just for testing purposes, will be replaced with api call
  const removeItem = (id: string) => {
    setList(prevState => {
      return { ...prevState, items: prevState.items.filter(item => item.id !== id) };
    });
  };

  //method to toggle check item from list just for testing purposes, will be replaced with api call
  const toggleCheckItem = (id: string) => {
    setList(prevState => {
      return {
        ...prevState,
        items: prevState.items.map(item => {
          if (item.id === id) {
            return { ...item, checked: !item.checked };
          }
          return item;
        }),
      };
    });
  };

  //method to remove member from list just for testing purposes, will be replaced with api call
  const removeMember = (id: string) => {
    setList(prevState => {
      return { ...prevState, members: prevState.members.filter(member => member.id !== id) };
    });
  };

  useEffect(() => {
    //fake api call delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return { list, isLoading, addItem, removeItem, toggleCheckItem, removeMember };
};

export default UseList;
