export type List = {
  id: string;
  owner: User;
  members: User[];
  name: string;
  archived: boolean;
  items: ListItem[];
  isOwner: boolean;
};

export type ListItem = { id: string; name: string; checked: boolean };
export type User = { id: string; name: string };
