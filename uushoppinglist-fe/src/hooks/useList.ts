import { useEffect, useState } from 'react';
import { List } from '../types/List.ts';
import useGet from './api/crud/useGet.ts';
import { ApiUrl } from './api/api.const.ts';
import usePost from './api/crud/usePost.ts';
import { AddItemPayload } from '../types/Item.ts';

type Props = {
  id: string | undefined;
};
const UseList = ({ id }: Props) => {
  const { data: list, refetch, isLoading } = useGet<List>({ url: ApiUrl([id]).list });
  const [localList, setLocalList] = useState<List | undefined>();
  const { post: postItem } = usePost<AddItemPayload, List>({ url: ApiUrl([id]).addItems });
  const [filter, setFilter] = useState<'all' | 'notDone'>('all');

  useEffect(() => {
    if (list) {
      switch (filter) {
        case 'notDone':
          getUnCheckedItems();
          break;
        default:
          getAllItems();
      }
      setLocalList(list);
    }
  }, [list, filter]);

  useEffect(() => {
    refetch();
  }, [id]);

  const addItem = () => {
    return new Promise<void>((resolve, reject) => {
      postItem({ name: 'New Item' })
        .then(() => {
          refetch();
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  };

  //method to remove item from list just for testing purposes, will be replaced with api call
  const removeItem = (id: string) => {
    setList(prevState => {
      if (prevState) return { ...prevState, items: prevState.items.filter(item => item.id !== id) };
    });
  };

  //method to remove member from list just for testing purposes, will be replaced with api call
  const removeMember = (id: string) => {
    setList(prevState => {
      if (prevState) return { ...prevState, members: prevState.members.filter(member => member.id !== id) };
    });
  };

  //method to set name of list just for testing purposes, will be replaced with api call
  const setName = (name: string) => {
    setList(prevState => {
      if (prevState) return { ...prevState, name: name };
    });
  };

  const getUnCheckedItems = () => {
    setLocalList(prevState => {
      if (prevState)
        return {
          ...prevState,
          items: prevState.items.filter(item => !item.isDone),
        };
    });
  };

  const getAllItems = () => {
    setLocalList(prevState => {
      if (prevState && list)
        return {
          ...prevState,
          items: list.items,
        };
    });
  };
  //method to set item name from list just for testing purposes, will be replaced with api call
  const setItemName = (name: string, id: string) => {
    setList(prevState => {
      if (prevState)
        return {
          ...prevState,
          items: prevState.items.map(item => {
            if (item.id === id) {
              return { ...item, name: name };
            }
            return item;
          }),
        };
    });
  };

  return {
    list: localList,
    isLoading,
    addItem,
    removeItem,
    removeMember,
    setName,
    getAllItems,
    getUnCheckedItems,
    setItemName,
    setFilter,
    filter,
  };
};

export default UseList;
