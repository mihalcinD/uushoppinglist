import { useEffect, useState } from 'react';
import { List, UpdateListPayload } from '../types/List.ts';
import useGet from './api/crud/useGet.ts';
import { ApiUrl } from './api/api.const.ts';
import usePost from './api/crud/usePost.ts';
import { AddItemPayload, UpdateItemPayload } from '../types/Item.ts';
import usePatch from './api/crud/usePatch.ts';
import useDelete from './api/crud/useDelete.ts';

type Props = {
  id: string | undefined;
};
const UseList = ({ id }: Props) => {
  const { data: list, refetch, isLoading } = useGet<List>({ url: ApiUrl([id]).list });
  const [localList, setLocalList] = useState<List | undefined>();
  const { post: postItem } = usePost<AddItemPayload, List>({ url: ApiUrl([id]).addItems });
  const [filter, setFilter] = useState<'all' | 'notDone'>('all');
  const { patch: patchItem } = usePatch<UpdateItemPayload, List>({ url: ApiUrl([id]).updateItem });
  const { patch: patchList } = usePatch<UpdateListPayload, List>({ url: ApiUrl().updateList });
  const { _delete: deleteItem } = useDelete({ url: ApiUrl([id]).deleteItem });

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

  const removeItem = (itemId: string) => {
    return new Promise<void>((resolve, reject) => {
      deleteItem(ApiUrl([id, itemId]).deleteItem)
        .then(() => {
          refetch();
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  };

  const setName = (name: string) => {
    return new Promise<void>((resolve, reject) => {
      patchList({ name })
        .then(() => {
          refetch();
          resolve();
        })
        .catch(() => {
          reject();
        });
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

  const setItemName = (name: string, itemID: string) => {
    return new Promise<void>((resolve, reject) => {
      patchItem({ name }, ApiUrl([id, itemID]).updateItem)
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

  return {
    list: localList,
    isLoading,
    addItem,
    removeItem,
    setName,
    getAllItems,
    getUnCheckedItems,
    setItemName,
    setFilter,
    filter,
  };
};

export default UseList;
