import { useEffect, useState } from 'react';
import { List } from '../types/List.ts';

const mockList: List = {
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
};
const UseList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState<List>(mockList);

  //method to add item to list just for testing purposes, will be replaced with api call
  const addItem = () => {
    setList(prevState => {
      return {
        ...prevState,
        items: [...prevState.items, { id: 'zz' + Math.random() * 100, name: 'New Item', checked: false }],
      };
    });
  };

  //method to remove item from list just for testing purposes, will be replaced with api call
  const removeItem = (id: string) => {
    setList(prevState => {
      return { ...prevState, items: prevState.items.filter(item => item.id !== id) };
    });
  };

  //method to set check item from list just for testing purposes, will be replaced with api call
  const setCheckItem = (id: string, checked: boolean) => {
    setList(prevState => {
      return {
        ...prevState,
        items: prevState.items.map(item => {
          if (item.id === id) {
            return { ...item, checked: checked };
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

  //method to set name of list just for testing purposes, will be replaced with api call
  const setName = (name: string) => {
    setList(prevState => {
      return { ...prevState, name: name };
    });
  };

  //method to get unChecked items from list just for testing purposes, will be replaced with api call
  const getUnCheckedItems = () => {
    setList(prevState => {
      return {
        ...prevState,
        items: prevState.items.filter(item => !item.checked),
      };
    });
  };

  //method to get all items from list just for testing purposes, will be replaced with api call
  const getAllItems = () => {
    setList(prevState => {
      return {
        ...prevState,
        items: mockList.items,
      };
    });
  };

  useEffect(() => {
    //fake api call delay
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return { list, isLoading, addItem, removeItem, setCheckItem, removeMember, setName, getAllItems, getUnCheckedItems };
};

export default UseList;
