import React from "react";
import moment from "moment";
import ContentEditable from "../ContentEditable";
import { NoteType } from "../shared/types/note";

type ListItemProps = {
  item: NoteType,
  onDelete: (item: NoteType) => void,
  onContentChanged: (newValue: NoteType, id: string) => void
};

function ListItem({ item, onDelete, onContentChanged }: ListItemProps) {
  return (
    <div className="card border-secondary mb-3" key={item.id}>
      <div className="card-header">
        <span className="text-warning" data-marker="createdDate">
          {moment(item.createdDate).format("MMM D, YYYY (dddd)")}
        </span>
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
            onContentChanged={(newValue: any) =>
              onContentChanged(newValue, item.id)
            }
            data-marker="note"
          />
        </div>
      </div>
    </div>
  );
}

export default ListItem;
