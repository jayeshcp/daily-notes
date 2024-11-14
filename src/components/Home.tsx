import React, { useState } from "react";
import styled from "styled-components";
import { injectIntl, defineMessages } from "react-intl";
import { connect } from "react-redux";
import { createNote, updateNote, deleteNote } from "../actions";
import Form from "./Form";
import ListView from "../ListView";

const NoItemsMessage = styled.div`
  font-size: 0.8em;
  color: #ff5722;
  margin-top: 1em;
`;

const messages = defineMessages({
  noNotesYet: {
    id: "index.noNotesYet",
    defaultMessage: "No notes added yet!",
  },
});

type HomeProps = {
  currentState: any;
  intl: any;
  txtSearch: string;
  createNote: (any) => void;
  deleteNote: (string) => void;
  updateNote: (any, string) => void;
};

function Home(props: HomeProps) {
  const { intl, currentState, createNote, updateNote, deleteNote } = props;
  const [txtSearch, setTxtSearch] = useState("");

  const { currentWorkspace, workspaces } = currentState;
  const { notes } = workspaces[currentWorkspace];

  const filteredNotes = notes?.filter(({ note }) =>
    new RegExp(txtSearch, "i").test(note)
  );

  const onFormSubmit = (txtValue: string) => {
    const newNote = {
      id: notes && notes.length > 0 ? notes[0].id + 1 : 1,
      note: txtValue,
      createdDate: Date.now(),
    };

    createNote(newNote);
    setTxtSearch('');
  };

  const onDelete = (item) => {
    deleteNote(item.id);
  };

  const onUpdate = (newNote, id) => {
    updateNote(newNote, id);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <Form onFormSubmit={(txtValue) => onFormSubmit(txtValue)} />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <input
            type="search"
            className="form-control"
            value={txtSearch}
            placeholder="search notes"
            onChange={(event) =>
              setTxtSearch(event.target.value)
            }
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          {notes.length > 0 && (
            <ListView
              items={filteredNotes}
              currentWorkspace={currentWorkspace}
              onDelete={(item) => onDelete(item)}
              onUpdate={(newValue, id) => onUpdate(newValue, id)}
            />
          )}

          {notes.length === 0 && (
            <NoItemsMessage data-marker="noNotesYet">
              {intl.formatMessage(messages.noNotesYet)}
            </NoItemsMessage>
          )}
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
    deleteNote: (id) => dispatch(deleteNote(id)),
    updateNote: (newNote, id) => dispatch(updateNote(newNote, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Home));
