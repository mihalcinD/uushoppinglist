import React, { createContext, useContext, useState, JSX, useEffect } from 'react';
import { AddListPayload, List, ListsResponse, UpdateListPayload } from '../types/List.ts';
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
  getArchivedLists: () => void;
  getAllLists: () => void;
  getMyLists: () => void;
  getSharedLists: () => void;
  setArchived: (id: string, isArchived: boolean) => Promise<void>;
  filter: 'all' | 'owner' | 'member' | 'archived';
  setFilter: React.Dispatch<React.SetStateAction<'all' | 'owner' | 'member' | 'archived'>>;
};

export const useListsContext = () => {
  return useContext(ListsContext);
};

export const ListsContext = createContext<ListsContextType>(undefined!);

export const ListsProvider = ({ children }: Props) => {
  const { data: lists, isLoading, refetch } = useGet<ListsResponse>({ url: ApiUrl().lists });
  const [localLists, setLocalLists] = useState<List[] | undefined>();
  const { post } = usePost<AddListPayload, List>({ url: ApiUrl().addList });
  const { _delete } = useDelete({ url: ApiUrl().deleteList });
  const { patch } = usePatch<UpdateListPayload, List>({ url: ApiUrl().updateList });
  const [filter, setFilter] = useState<'all' | 'owner' | 'member' | 'archived'>('all');

  useEffect(() => {
    if (lists) {
      switch (filter) {
        case 'member':
          getSharedLists();
          break;
        case 'owner':
          getMyLists();
          break;
        case 'archived':
          getArchivedLists();
          break;
        default:
          setLocalLists(lists.result);
      }
    }
  }, [lists, filter]);

  const addList = (name: string) => {
    return new Promise<void>((resolve, reject) => {
      post({ name })
        .then(list => {
          refetch();
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
          refetch();
          resolve();
        })
        .catch(() => {
          {
            reject();
          }
        });
    });
  };

  const getArchivedLists = () => {
    setLocalLists(() => {
      if (lists) {
        return lists.result.filter(list => list.isArchived);
      }
      return [];
    });
  };

  const getAllLists = () => {
    setLocalLists(lists?.result);
  };

  const getMyLists = () => {
    setLocalLists(() => {
      return lists?.result.filter(list => list.isOwner);
    });
  };

  const getSharedLists = () => {
    setLocalLists(() => {
      return lists?.result.filter(list => !list.isOwner);
    });
  };

  const setArchived = (id: string, isArchived: boolean) => {
    return new Promise<void>((resolve, reject) => {
      patch({ isArchived }, ApiUrl([id]).updateList)
        .then(() => {
          refetch();
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
        getAllLists,
        getArchivedLists,
        getMyLists,
        getSharedLists,
        setArchived,
        filter,
        setFilter,
      }}>
      {children}
    </ListsContext.Provider>
  );
};
