import { useEffect, useState } from 'react';
import { List, ListResponse, UpdateListPayload } from '../types/List.ts';
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
  const { isLoading, get } = useGet<ListResponse>({ url: ApiUrl([id]).list });
  const [localList, setLocalList] = useState<List | undefined>();
  const { post: postItem } = usePost<AddItemPayload, ListResponse>({ url: ApiUrl([id]).addItems });
  const [filter, setFilter] = useState<'all' | 'notDone'>('all');
  const { patch: patchItem } = usePatch<UpdateItemPayload, ListResponse>({ url: ApiUrl([id]).updateItem });
  const { patch: patchList } = usePatch<UpdateListPayload, ListResponse>({ url: ApiUrl([id]).updateList });
  const { _delete: deleteItem } = useDelete({ url: ApiUrl([id]).deleteItem });

  useEffect(() => {
    const getFilteredList = async () => {
      const _list = await get();
      if (_list)
        switch (filter) {
          case 'notDone':
            getUnCheckedItems(_list.result);
            break;
          default:
            getAllItems(_list.result);
        }
    };
    getFilteredList();
  }, [filter, id]);

  const addItem = () => {
    return new Promise<void>((resolve, reject) => {
      postItem({ name: 'New Item' })
        .then(list => {
          setLocalList(list.result);
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
          setLocalList(prevState => {
            if (prevState)
              return {
                ...prevState,
                items: prevState.items.filter(item => item._id !== itemId),
              };
          });
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
        .then(list => {
          setLocalList(list.result);
          resolve();
        })
        .catch(() => {
          reject();
        });
    });
  };

  const getUnCheckedItems = (list: List) => {
    setLocalList(() => {
      return {
        ...list,
        items: list.items.filter(item => !item.isDone),
      };
    });
  };

  const getAllItems = (list: List) => {
    setLocalList(list);
  };

  const setItemName = (name: string, itemID: string) => {
    return new Promise<void>((resolve, reject) => {
      patchItem({ name }, ApiUrl([id, itemID]).updateItem)
        .then(list => {
          setLocalList(list.result);
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
