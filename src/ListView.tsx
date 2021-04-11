import React, { Component } from "react";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import moment from "moment";
import ContentEditable from "./ContentEditable";

const DEFAULT_PAGE_SIZE = 2;

const messages = {
  entriesCount: {
    id: "ListView.entriesCount",
    defaultMessage: `{count, plural, one {entry} other {entries}}`
  }
};

type ListViewProps = {
  intl: any,
  items: any[];
  onDelete: (any) => void;
  onUpdate: (any, string) => void;
}

type ListViewState = {
  pageSize: number
}

class ListView extends Component<ListViewProps, ListViewState> {
  readonly state = {
    pageSize: DEFAULT_PAGE_SIZE
  };

  onContentChanged(newValue, id) {
    this.props.onUpdate(newValue, id);
  }

  onShowMore(event) {
    const { pageSize } = this.state;
    let pageSizeIncrement = 1;
    this.setState({ pageSize: pageSize + pageSizeIncrement });
    event.preventDefault();
  }

  render() {
    const { pageSize } = this.state;
    const { items: itemsOriginal, onDelete } = this.props;
    let [...items] = itemsOriginal;
    items = items.sort((a, b) => {
      if (a.id === b.id) {
        return 0;
      }

      if (a.id > b.id) {
        return -1;
      }

      return 1;
    });

    const displayedItems = items.slice(0, pageSize);

    const rows = displayedItems.map((item) => {
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
                onContentChanged={(newValue) =>
                  this.onContentChanged(newValue, item.id)
                }
                data-marker="note"
              />
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <div>
            <small className="text-info" data-marker="notesCount">
              Total: {items.length || 0}{" "}
              {this.props.intl.formatMessage(messages.entriesCount, {
                count: items.length
              })}
              !
            </small>
          </div>

          <div data-marker="rows">{rows}</div>

          {pageSize < items.length && (
            <div>
              <a
                className="btn btn-link btn-block"
                href="#"
                onClick={(e) => this.onShowMore(e)}
                data-marker="showMoreBtn"
              >
                Show more
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default injectIntl(ListView);
