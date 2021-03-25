import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactQuill from "react-quill";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtValue: props.txtValue
    };

    this.onSave = this.onSave.bind(this);
  }

  onChange(txtValue) {
    const { onChange } = this.props;

    this.setState({ txtValue });
    onChange(txtValue);
  }

  onSave() {
    const { onFormSubmit } = this.props;
    const { txtValue } = this.state;

    onFormSubmit(txtValue);
    this.setState({
      txtValue: ""
    });
  }

  onKeyDown(event) {
    if (event.key === "Enter" && event.metaKey) {
      event.preventDefault();
      this.onSave();
      return false;
    }
  }

  render() {
    const { txtValue } = this.state;
    const { placeholder } = this.props;

    return (
      <div className="row" style={{ marginBottom: "1em" }}>
        <div className="col-md-12 col-sm-12">
          <ReactQuill
            className="form-control"
            placeholder={placeholder}
            theme="bubble"
            value={txtValue}
            onChange={(txtValue) => this.onChange(txtValue)}
            onKeyDown={(e) => this.onKeyDown(e)}
          />
        </div>

        <div className="col-md-12 col-sm-12">
          <small className="text-muted pull-right">Cmd+Enter to submit</small>
          <button
            className="btn btn-success btn-sm btn-block"
            onClick={this.onSave}
            disabled={!txtValue || txtValue.trim() === ""}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  txtValue: PropTypes.string,
  onChange: PropTypes.func,
  onFormSubmit: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["input", "textarea"]),
  placeholder: PropTypes.string
};

Form.defaultProps = {
  txtValue: "",
  onChange: (txtValue) => {},
  type: "textarea",
  placeholder: "how was your day?"
};

export default Form;
