import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "./style.css";

type ContentEditableProps = {
  initialValue: string,
  onContentChanged: (string) => void
}

type ContentEditableState = {
  editing: boolean,
  content: string
}

class ContentEditable extends Component<ContentEditableProps, ContentEditableState> {
  static defaultProps = {
    initialValue: ""
  }

  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      content: props.initialValue
    };
  }

  onContentChanged() {
    this.setState({ editing: !this.state.editing });
    this.props.onContentChanged(this.state.content);
  }

  render() {
    const { editing, content } = this.state;

    return (
      <div className={editing ? "normal" : "content"}>
        <ReactQuill
          theme="bubble"
          value={content}
          onChange={(content) => this.setState({ content })}
          onFocus={() => this.setState({ editing: !this.state.editing })}
          onBlur={() => this.onContentChanged()}
        />
      </div>
    );
  }
}

export default ContentEditable;
