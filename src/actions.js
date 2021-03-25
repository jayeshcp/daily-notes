const createNote = (note) => {
    return {
      type: "CREATE_NOTE",
      payload: note
    };
  };
  
  const updateNote = (note, id) => {
    return {
      type: "UPDATE_NOTE",
      payload: {
        id: id,
        note: note
      }
    };
  };
  
  const deleteNote = (id) => {
    return {
      type: "DELETE_NOTE",
      payload: {
        id: id
      }
    };
  };
  
  export { createNote, updateNote, deleteNote };
  