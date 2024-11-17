import React from "react";
import moment from "moment";
import ContentEditable from "../ContentEditable";
import { NoteType } from "../shared/types/note";
import { NavLink } from "react-router-dom";

type ListItemProps = {
  item: NoteType,
  onDelete: (item: NoteType) => void,
  onContentChanged: (newValue: NoteType, id: number) => void
};

function ListItem({ item, onDelete, onContentChanged }: ListItemProps) {
  return (
    <div className="card border-secondary mb-3" key={item.id}>
      <div className="card-header">
        <NavLink
          className="btn btn-sm btn-link text-warning"
          data-marker="createdDate"
          to={`/note/${item.id}`}
        >
          {moment(item.createdDate).format("MMM D, YYYY (dddd)")}
        </NavLink>
        <button
          className="btn btn-sm btn-danger pull-right"
          onClick={() => {
            const result = window.confirm("Deleting note, are you sure?");
            if (result) {
              onDelete(item);
            }
          }}
          title="Delete"
          data-marker="delete"
        >
          <span className="fa fa-trash" />
        </button>
      </div>
      <div className="card-body card">
        <div className="card-text">
          <ContentEditable
            initialValue={item.note}
            data-marker="note"
          />
        </div>
      </div>
    </div>
  );
}

export default ListItem;
