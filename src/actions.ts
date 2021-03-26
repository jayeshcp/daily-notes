const createNote = (note: any) => {
    return {
      type: "CREATE_NOTE",
      payload: note
    };
  };
  
  const updateNote = (note: any, id: string) => {
    return {
      type: "UPDATE_NOTE",
      payload: {
        id: id,
        note: note
      }
    };
  };
  
  const deleteNote = (id: string) => {
    return {
      type: "DELETE_NOTE",
      payload: {
        id: id
      }
    };
  };
  
  export { createNote, updateNote, deleteNote };
  