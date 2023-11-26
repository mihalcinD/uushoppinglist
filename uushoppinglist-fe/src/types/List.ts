export type List = {
  _id: string;
  ownerID: User;
  membersIDs: User[];
  name: string;
  isArchived: boolean;
  items: ListItem[];
  isOwner: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ListItem = { _id: string; name: string; isDone: boolean };
export type User = { id: string; name: string };

export type ListsResponse = {
  success: boolean;
  result: List[];
  errors: any;
};

export type AddListPayload = {
  name: string;
  membersIDs?: string[];
  items?: { name: string; isDone?: boolean }[];
};

export type UpdateListPayload = {
  name?: string;
  isArchived?: boolean;
};
