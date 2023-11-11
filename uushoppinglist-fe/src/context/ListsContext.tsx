import { createContext, useContext, useState, JSX, useEffect } from 'react';
import { List } from '../types/List.ts';

type Props = {
  children: JSX.Element | JSX.Element[];
};

type ListsContextType = {
  lists: List[] | undefined;
  addList: (name: string) => Promise<void>;
  isLoading: boolean;
  deleteList: (id: string) => Promise<void>;
  getArchivedLists: () => Promise<void>;
  getAllLists: () => Promise<void>;
  getMyLists: () => Promise<void>;
  getSharedLists: () => Promise<void>;
  setArchived: (id: string, isArchived: boolean) => Promise<void>;
};

export const useListsContext = () => {
  return useContext(ListsContext);
};

export const ListsContext = createContext<ListsContextType>(undefined!);

const MockLists = [
  { id: '1', name: 'List 1', isArchived: false, isOwner: true },
  { id: '2', name: 'List 2', isArchived: false, isOwner: false },
  { id: '3', name: 'List 3', isArchived: true, isOwner: true },
];

export const ListsProvider = ({ children }: Props) => {
  const [mockLists, setMockLists] = useState<List[] | undefined>(MockLists);
  const [lists, setLists] = useState<List[] | undefined>(MockLists);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    //fake api call delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  //method to add a list just for testing purposes, will be replaced with a call to the api
  const addList = (name: string) => {
    return new Promise<void>((resolve, reject) => {
      setLists(lists => {
        if (lists) {
          return [...lists, { name, id: (lists.length + 1).toString(), isArchived: false, isOwner: true }];
        }
        return [{ name, id: '1', isArchived: false, isOwner: true }];
      });
      resolve();
    });
  };

  //method to delete a list just for testing purposes, will be replaced with a call to the api
  const deleteList = (id: string) => {
    return new Promise<void>((resolve, reject) => {
      setMockLists(prevState => {
        let lists: List[] = [];
        if (prevState) {
          lists = prevState.filter(list => list.id !== id);
        }
        setLists(lists);
        return lists;
      });
      resolve();
    });
  };

  //method to get lists which are archived just for testing purposes, will be replaced with a call to the api
  const getArchivedLists = () => {
    return new Promise<void>((resolve, reject) => {
      setLists(() => {
        if (mockLists) {
          return mockLists.filter(list => list.isArchived);
        }
        return [];
      });
      resolve();
    });
  };

  //method to get all lists just for testing purposes, will be replaced with a call to the api
  const getAllLists = () => {
    return new Promise<void>((resolve, reject) => {
      setLists(mockLists);
      resolve();
    });
  };

  //method to get lists where the user is the owner just for testing purposes, will be replaced with a call to the api
  const getMyLists = () => {
    return new Promise<void>((resolve, reject) => {
      setLists(() => {
        if (mockLists) {
          return mockLists.filter(list => list.isOwner);
        }
        return [];
      });
      resolve();
    });
  };
  //method to get list where the user is not the owner just for testing purposes, will be replaced with a call to the api
  const getSharedLists = () => {
    return new Promise<void>((resolve, reject) => {
      setLists(() => {
        if (mockLists) {
          return mockLists.filter(list => !list.isOwner);
        }
        return [];
      });
      resolve();
    });
  };

  //method to set archived status of a list just for testing purposes, will be replaced with a call to the api
  const setArchived = (id: string, isArchived: boolean) => {
    return new Promise<void>((resolve, reject) => {
      setMockLists(prevState => {
        let lists: List[] = [];
        if (prevState) {
          lists = prevState.map(list => {
            if (list.id === id) {
              return { ...list, isArchived };
            }
            return list;
          });
        }
        setLists(lists);
        return lists;
      });
      resolve();
    });
  };

  return (
    <ListsContext.Provider
      value={{
        lists,
        addList,
        isLoading,
        deleteList,
        getAllLists,
        getArchivedLists,
        getMyLists,
        getSharedLists,
        setArchived,
      }}>
      {children}
    </ListsContext.Provider>
  );
};
