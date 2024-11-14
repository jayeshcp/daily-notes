import React from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { createNote } from "../actions";
import Form from "./Form";
import { NoteType } from "../shared/types/note";
import { AppState } from "../reducers/notes";


type HomeProps = {
  currentState: AppState;
  createNote: (newNote: NoteType) => void;
};

function AddEditNote(props: HomeProps) {
  const { currentState, createNote } = props;
  const history = useHistory();
  const params = useParams() as any;
  let id: string | undefined = undefined;
  if (params?.id) {
    id = params.id;
  }

  const { currentWorkspace, workspaces } = currentState;
  const { notes } = workspaces[currentWorkspace];

  const onFormSubmit = (txtValue: string) => {
    const newNote = {
      id: notes && notes.length > 0 ? notes[0].id + 1 : 1,
      note: txtValue,
      createdDate: Date.now(),
    } as NoteType;

    createNote(newNote);
    history.push('/');
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          {id && (<h3>Edit Note</h3>)}
          {!id && (<h3>Add Note</h3>)}
          <Form onFormSubmit={(newValue) => onFormSubmit(newValue)} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: { notes: AppState }) => {
  return {
    currentState: state.notes,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    createNote: (newNote: NoteType) => dispatch(createNote(newNote)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditNote);
