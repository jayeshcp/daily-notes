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

  const updateWorkspace = (workspace: string) => {
    return {
      type: "UPDATE_WORKSPACE",
      payload: {
        workspace
      }
    };
  };
  
  export { createNote, updateNote, deleteNote, updateWorkspace };
  