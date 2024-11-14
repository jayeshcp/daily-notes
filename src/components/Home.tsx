import React, { useState } from "react";
import styled from "styled-components";
import { injectIntl, defineMessages } from "react-intl";
import { connect } from "react-redux";
import { updateNote, deleteNote } from "../actions";
import ListView from "../ListView";
import { NavLink } from "react-router-dom";

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
  deleteNote: (string) => void;
  updateNote: (any, string) => void;
};

function Home(props: HomeProps) {
  const { intl, currentState, updateNote, deleteNote } = props;
  const [txtSearch, setTxtSearch] = useState("");

  const { currentWorkspace, workspaces } = currentState;
  const { notes } = workspaces[currentWorkspace];

  const filteredNotes = notes?.filter(({ note }) =>
    new RegExp(txtSearch, "i").test(note)
  );

  const onDelete = (item) => {
    deleteNote(item.id);
  };

  const onUpdate = (newNote, id) => {
    updateNote(newNote, id);
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-12 mb-3">
          <NavLink
            className="btn btn-sm btn-primary"
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
    deleteNote: (id) => dispatch(deleteNote(id)),
    updateNote: (newNote, id) => dispatch(updateNote(newNote, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Home));
