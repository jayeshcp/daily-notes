interface Item {
  id: number
}

export const filterByIdReverse = (items: Item[]) => {
  return items.sort((a, b) => {
    if (a.id === b.id) {
      return 0;
    }
  
    if (a.id > b.id) {
      return -1;
    }
  
    return 1;
  });
};
