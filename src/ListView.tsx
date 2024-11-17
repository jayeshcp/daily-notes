import React, { useState } from "react";
import { injectIntl } from "react-intl";
import ListItem from "./components/ListItem";
import NotesCount from "./components/NotesCount";
import ShowMoreButton from "./components/ShowMoreButton";
import { filterByIdReverse } from "./Utils";
import { NoteType } from "./shared/types/note";

const DEFAULT_PAGE_SIZE = 2;

type ListViewProps = {
  intl: any,
  items: NoteType[];
  currentWorkspace: string;
  onDelete: (item: NoteType) => void;
  onUpdate: (newValue: NoteType, id: number) => void;
}

function ListView(props: ListViewProps) {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const {
    items: itemsOriginal,
    currentWorkspace,
    onDelete,
    onUpdate
  } = props;
  let [...items] = itemsOriginal;
  items = filterByIdReverse(items);

  const onContentChanged = (newValue: NoteType, id: number) => {
    onUpdate(newValue, id);
  };

  const onShowMore = (event: any) => {
    setPageSize(pageSize + 1);
    event.preventDefault();
  };

  const displayedItems = items.slice(0, pageSize);

  const rows = displayedItems.map((item: NoteType) => {
    return (
      <ListItem
        item={item}
        onDelete={onDelete}
        onContentChanged={onContentChanged}
        key={`${currentWorkspace}-${item.id}`}
      />
    );
  });

  return (
    <div className="row">
      <div className="col-md-12 col-sm-12">
        <NotesCount items={items} />

        <div data-marker="rows">{rows}</div>

        {pageSize < items.length && (
          <ShowMoreButton onShowMore={onShowMore} />
        )}
      </div>
    </div>
  );
}

export default injectIntl(ListView);
