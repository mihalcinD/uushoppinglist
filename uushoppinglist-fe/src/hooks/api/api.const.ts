export const ApiUrl = <T = never>([...params]: T[] = []) => ({
  lists: 'lists/',
  addList: 'lists/',
  deleteList: `lists/${params[0]}/`,
  updateList: `lists/${params[0]}/`,
  list: `lists/${params[0]}/`,
  addItems: `lists/${params[0]}/items/`,
  updateItem: `lists/${params[0]}/items/${params[1]}/`,
  deleteItem: `lists/${params[0]}/items/${params[1]}/`,
  deleteMember: `lists/${params[0]}/members/${params[1]}/`,
  addMember: `lists/${params[0]}/members/`,
});
