import React from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { createNote, updateNote } from "../actions";
import Form from "./Form";
import { NoteType } from "../shared/types/note";
import { AppState } from "../reducers/notes";


type HomeProps = {
  currentState: AppState;
  createNote: (newNote: NoteType) => void;
  updateNote: (newNode: NoteType, id: number) => void
};

function AddEditNote(props: HomeProps) {
  const { currentState, createNote, updateNote } = props;
  const history = useHistory();
  const params = useParams() as any;
  let id: number | undefined = undefined;
  
  const { currentWorkspace, workspaces } = currentState;
  const { notes } = workspaces[currentWorkspace];

  let note: NoteType | undefined = undefined;
  if (params?.id) {
    id = parseInt(params.id);
    note = notes.find(_note => _note.id === id);
  }

  const onFormSubmit = (txtValue: string) => {
    const newNote = {
      id: id || (notes && notes.length > 0 ? notes[0].id + 1 : 1),
      note: txtValue,
      createdDate: Date.now(),
    } as NoteType;

    id ? updateNote(newNote, id) : createNote(newNote);
    history.push('/');
  };

  const onCancel = () => {
    history.push('/');
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          {id && (<h3>Edit Note</h3>)}
          {!id && (<h3>Add Note</h3>)}
          <Form initialValue={note?.note} onFormSubmit={(newValue) => onFormSubmit(newValue)} onCancel={onCancel} />
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
    updateNote: (newNote: NoteType, id: number) => dispatch(updateNote(newNote, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditNote);
