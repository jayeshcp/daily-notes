type NoteType = {
  id: string,
  note: string,
  createdDate: number
};

const initialState: NoteType[] = [];

function reducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_NOTE":
      return [action.payload, ...state];
    case "UPDATE_NOTE":
      return state.map((note: NoteType) =>
        note.id === action.payload.id
          ? { ...note, note: action.payload.note }
          : note
      );
    case "DELETE_NOTE":
      return state.filter((note: NoteType) => note.id !== action.payload.id);
    default:
      return state;
  }
}

export default reducer;
