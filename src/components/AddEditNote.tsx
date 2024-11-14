import React from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { createNote } from "../actions";
import Form from "./Form";


type HomeProps = {
  currentState: any;
  createNote: (any) => void;
};

function AddEditNote(props: HomeProps) {
  const { currentState, createNote } = props;
  const history = useHistory();
  const params = useParams() as any;
  let id;
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
    };

    createNote(newNote);
    history.push('/');
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          {id && (<h3>Edit Note</h3>)}
          {!id && (<h3>Add Note</h3>)}
          <Form onFormSubmit={(txtValue) => onFormSubmit(txtValue)} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    currentState: state.notes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNote: (note) => dispatch(createNote(note)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEditNote);
