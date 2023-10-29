export type List = {
  id: string;
  owner: { id: string; name: string };
  members: { id: string; name: string }[];
  name: string;
  archived: boolean;
  items: ListItem[];
  isOwner: boolean;
};

export type ListItem = { id: string; name: string; checked: boolean };
