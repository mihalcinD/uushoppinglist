export type ListDetail = {
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

export type Lists = {
  id: string;
  name: string;
  archived: boolean;
  isOwner: boolean;
}[];
