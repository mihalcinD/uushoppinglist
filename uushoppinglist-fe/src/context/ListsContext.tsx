import { createContext, useContext, useState, JSX } from 'react';
import { Lists } from '../types/List.ts';

type Props = {
  children: JSX.Element | JSX.Element[];
};

type ListsContextType = { lists: Lists | undefined; addList: (name: string) => Promise<void> };

export const useListsContext = () => {
  return useContext(ListsContext);
};

export const ListsContext = createContext<ListsContextType>(undefined!);

export const ListsProvider = ({ children }: Props) => {
  const [lists, setLists] = useState<Lists | undefined>();

  //method to add a list just for testing purposes, will be replaced with a call to the api
  const addList = (name: string) => {
    return new Promise<void>((resolve, reject) => {
      setLists(lists => {
        if (lists) {
          return [...lists, { name, id: (lists.length + 1).toString(), archived: false, isOwner: true }];
        }
        return [{ name, id: '1', archived: false, isOwner: true }];
      });
      resolve();
    });
  };
  return <ListsContext.Provider value={{ lists, addList }}>{children}</ListsContext.Provider>;
};
