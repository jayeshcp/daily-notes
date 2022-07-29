import React, { useState } from "react";
import { injectIntl } from "react-intl";
import ListItem from "./components/ListItem";
import NotesCount from "./components/NotesCount";
import ShowMoreButton from "./components/ShowMoreButton";
import { filterByIdReverse } from "./Utils";

const DEFAULT_PAGE_SIZE = 2;

type ListViewProps = {
  intl: any,
  items: any[];
  onDelete: (any) => void;
  onUpdate: (any, string) => void;
}

function ListView(props: ListViewProps) {
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const {
    items: itemsOriginal,
    onDelete,
    onUpdate
  } = props;
  let [...items] = itemsOriginal;
  items = filterByIdReverse(items);

  const onContentChanged = (newValue: any, id: string) => {
    onUpdate(newValue, id);
  };

  const onShowMore = (event) => {
    setPageSize(pageSize + 1);
    event.preventDefault();
  };

  const displayedItems = items.slice(0, pageSize);

  const rows = displayedItems.map((item) => {
    return (
      <ListItem
        item={item}
        onDelete={onDelete}
        onContentChanged={onContentChanged}
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
