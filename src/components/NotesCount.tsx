import React from "react";
import { injectIntl } from "react-intl";

type NotesCountProps = {
  intl: any,
  items: any[];
}

const messages = {
  entriesCount: {
    id: "ListView.entriesCount",
    defaultMessage: `{count, plural, one {entry} other {entries}}`
  }
};

function NotesCount({
  intl: { formatMessage },
  items
}: NotesCountProps) {
  return (
    <div>
      <small className="text-info" data-marker="notesCount">
        Total: {items.length || 0}{" "}
        {formatMessage(messages.entriesCount, {
          count: items.length
        })}
        !
      </small>
    </div>
  );
}

export default injectIntl(NotesCount);
