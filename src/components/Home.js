import React, { Component } from "react";
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
    defaultMessage: "No notes added yet!"
  }
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtSearch: ""
    };
  }

  onFormSubmit(txtValue) {
    const notes = this.props.notes.slice();
    const newNote = {
      id: notes && notes.length > 0 ? notes[0].id + 1 : 1,
      note: txtValue,
      createdDate: Date.now()
    };

    this.props.createNote(newNote);
  }

  onDelete(item) {
    this.props.deleteNote(item.id);
  }

  onUpdate(newNote, id) {
    this.props.updateNote(newNote, id);
  }

  render() {
    const { intl, notes } = this.props;
    const { txtSearch } = this.state;

    const filteredNotes = notes.filter(({ note }) =>
      new RegExp(txtSearch, "i").test(note)
    );

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <Form onFormSubmit={(txtValue) => this.onFormSubmit(txtValue)} />
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
                this.setState({ txtSearch: event.target.value })
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            {notes.length > 0 && (
              <ListView
                items={filteredNotes}
                onDelete={(item) => this.onDelete(item)}
                onUpdate={(newValue, id) => this.onUpdate(newValue, id)}
              />
            )}

            {notes.length === 0 && (
              <NoItemsMessage>
                {intl.formatMessage(messages.noNotesYet)}
              </NoItemsMessage>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createNote: (note) => dispatch(createNote(note)),
    deleteNote: (id) => dispatch(deleteNote(id)),
    updateNote: (newNote, id) => dispatch(updateNote(newNote, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Home));
