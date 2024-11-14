import { NoteType, WorkspaceType } from "../shared/types/note";

export type AppState = {
  workspaces: {
    personal: {
      notes: NoteType[]
    },
    work: {
      notes: NoteType[]
    }
  },
  currentWorkspace: WorkspaceType
};

const initialState: AppState = {
  workspaces: {
    personal: {
      notes: []
    },
    work: {
      notes: []
    }
  },
  currentWorkspace: 'personal'
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_NOTE": {
      const newNote: NoteType = action.payload;

      return {
        workspaces: {
          ...state.workspaces,
          [state.currentWorkspace]: {
            notes: [newNote, ...state.workspaces[state.currentWorkspace].notes]
        },
        },
        currentWorkspace: state.currentWorkspace,
      };
    }

    case "UPDATE_NOTE": {
      const updatedNote: NoteType = action.payload.note;

      const {currentWorkspace, workspaces} = state;
      const notes = workspaces[currentWorkspace].notes;
      workspaces[currentWorkspace].notes = notes.map((_note: NoteType) => {
        if (_note.id === action.payload.id) {
          return { ..._note, ...updatedNote }
        }
        return _note;
      });
      return { ...state };
    }
      
    case "DELETE_NOTE": {
      const {currentWorkspace, workspaces} = state;
      const notes = workspaces[currentWorkspace].notes;
      workspaces[currentWorkspace].notes = notes.filter((note: NoteType) => note.id !== action.payload.id);
      return {...state};
    }
    case "UPDATE_WORKSPACE": {
      const newWorkspace: WorkspaceType = action.payload.workspace;
      return {
        ...state,
        currentWorkspace: newWorkspace
      }
    }
    default:
      return state;
  }
}

export default reducer;
