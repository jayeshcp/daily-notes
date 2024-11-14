import { NoteType } from "./shared/types/note";

export const filterByIdReverse = (items: NoteType[]) => {
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
