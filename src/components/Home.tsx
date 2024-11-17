import React, { useState } from "react";
import styled from "styled-components";
import { injectIntl, defineMessages } from "react-intl";
import { connect } from "react-redux";
import { updateNote, deleteNote } from "../actions";
import ListView from "../ListView";
import { NavLink } from "react-router-dom";
import { NoteType } from "../shared/types/note";
import { AppState } from "../reducers/notes";

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
  currentState: AppState;
  intl: any;
  txtSearch: string;
  deleteNote: (id: number) => void;
  updateNote: (newNote: NoteType, id: number) => void;
};

function Home(props: HomeProps) {
  const { intl, currentState, updateNote, deleteNote } = props;
  const [txtSearch, setTxtSearch] = useState("");

  const { currentWorkspace, workspaces } = currentState;
  const { notes } = workspaces[currentWorkspace];

  const filteredNotes = notes?.filter(({ note }) =>
    new RegExp(txtSearch, "i").test(note)
  );

  const onDelete = (item: NoteType) => {
    deleteNote(item.id);
  };

  const onUpdate = (newNote: NoteType, id: number) => {
    updateNote(newNote, id);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12 mb-3">
          <NavLink
            className="btn btn-sm btn-info"
            to="/note/#"
          >
            New Note
          </NavLink>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <input
            type="search"
            className="form-control"
            value={txtSearch}
            placeholder="search notes"
            onChange={(event: any) =>
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
              onDelete={(item: NoteType) => onDelete(item)}
              onUpdate={(newValue: NoteType, id: number) => onUpdate(newValue, id)}
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

const mapStateToProps = (state: { notes: AppState }) => {
  return {
    currentState: state.notes,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    deleteNote: (id: number) => dispatch(deleteNote(id)),
    updateNote: (newNote: NoteType, id: number) => dispatch(updateNote(newNote, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Home));
