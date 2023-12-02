import React, { createContext, useContext, useState, JSX, useEffect } from 'react';
import {
  AddListPayload,
  AddListResponse,
  List,
  ListsResponse,
  UpdateListPayload,
  UpdateListResponse,
} from '../types/List.ts';
import useGet from '../hooks/api/crud/useGet.ts';
import { ApiUrl } from '../hooks/api/api.const.ts';
import usePost from '../hooks/api/crud/usePost.ts';
import useDelete from '../hooks/api/crud/useDelete.ts';
import usePatch from '../hooks/api/crud/usePatch.ts';

type Props = {
  children: JSX.Element | JSX.Element[];
};

type ListsContextType = {
  lists: List[] | undefined;
  addList: (name: string) => Promise<void>;
  isLoading: boolean;
  deleteList: (id: string) => Promise<void>;
  setArchived: (id: string, isArchived: boolean) => Promise<void>;
  filter: 'all' | 'owner' | 'member' | 'archived';
  setFilter: React.Dispatch<React.SetStateAction<'all' | 'owner' | 'member' | 'archived'>>;
};

export const useListsContext = () => {
  return useContext(ListsContext);
};

export const ListsContext = createContext<ListsContextType>(undefined!);

export const ListsProvider = ({ children }: Props) => {
  const { isLoading, get } = useGet<ListsResponse>({ url: ApiUrl().lists });
  const [lists, setLists] = useState<ListsResponse>();
  const [localLists, setLocalLists] = useState<List[] | undefined>();
  const { post } = usePost<AddListPayload, AddListResponse>({ url: ApiUrl().addList });
  const { _delete } = useDelete({ url: ApiUrl().deleteList });
  const { patch } = usePatch<UpdateListPayload, UpdateListResponse>({ url: ApiUrl().updateList });
  const [filter, setFilter] = useState<'all' | 'owner' | 'member' | 'archived'>('all');

  useEffect(() => {
    const getFilteredLists = async () => {
      const _lists = await get();
      if (_lists) {
        switch (filter) {
          case 'member':
            getSharedLists(_lists);
            break;
          case 'owner':
            getMyLists(_lists);
            break;
          case 'archived':
            getArchivedLists(_lists);
            break;
          default:
            setLocalLists(_lists.result);
        }
      }
    };

    getFilteredLists();
  }, [filter]);

  const addList = (name: string) => {
    return new Promise<void>((resolve, reject) => {
      post({ name })
        .then(list => {
          console.log('ADDED', list);
          setLocalLists(prevState => {
            if (!prevState) return [list.result];
            return [...prevState, list.result];
          });
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  };

  const deleteList = (id: string) => {
    return new Promise<void>((resolve, reject) => {
      _delete(ApiUrl([id]).deleteList)
        .then(() => {
          setLocalLists(prevState => {
            if (prevState) return prevState.filter(list => list._id !== id);
          });
          resolve();
        })
        .catch(() => {
          {
            reject();
          }
        });
    });
  };

  const getArchivedLists = (_lists: ListsResponse) => {
    setLocalLists(() => {
      return _lists.result.filter(list => list.isArchived);
    });
  };

  const getMyLists = (_lists: ListsResponse) => {
    setLocalLists(() => {
      return _lists.result.filter(list => list.isOwner);
    });
  };

  const getSharedLists = (_lists: ListsResponse) => {
    setLocalLists(() => {
      return _lists.result.filter(list => !list.isOwner);
    });
  };

  const setArchived = (id: string, isArchived: boolean) => {
    return new Promise<void>((resolve, reject) => {
      patch({ isArchived }, ApiUrl([id]).updateList)
        .then(listResponse => {
          const list = listResponse.result;
          setLocalLists(prevState => {
            if (prevState) {
              return prevState.map(_list => {
                if (_list._id === list._id) {
                  return list;
                }
                return _list;
              });
            }
          });
          resolve();
        })
        .catch(() => {
          {
            reject();
          }
        });
    });
  };

  return (
    <ListsContext.Provider
      value={{
        lists: localLists,
        addList,
        isLoading,
        deleteList,
        setArchived,
        filter,
        setFilter,
      }}>
      {children}
    </ListsContext.Provider>
  );
};
