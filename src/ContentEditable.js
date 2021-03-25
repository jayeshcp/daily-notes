import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";
import "./style.css";

class ContentEditable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      content: props.initialValue
    };
  }

  componentDidUpdate() {
    if (this.textArea) {
      this.textArea.focus();
    }
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

ContentEditable.propTypes = {
  initialValue: PropTypes.string,
  onContentChanged: PropTypes.func.isRequired
};

ContentEditable.defaultProps = {
  initialValue: ""
};

export default ContentEditable;
