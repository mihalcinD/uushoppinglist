export type AddItemPayload = {
  name: string;
};

export type UpdateItemPayload = {
  name?: string;
  isDone?: boolean;
};
