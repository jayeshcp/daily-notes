import React, { useState } from "react";
import ReactQuill from "react-quill";

type FormProps = {
  txtValue?: string,
  onChange?: (string) => void,
  onFormSubmit: (string) => void,
  type?: 'input' |'textarea',
  placeholder?: string
}

const Form: React.FC<FormProps> = ({
  txtValue = '',
  onChange,
  onFormSubmit,
  type = 'textarea',
  placeholder = 'how was your day?'
}) => {
  const [value, setValue] = useState(txtValue);

  const handleChange = (txtValue) => {
    setValue(txtValue);
    if (onChange) {
      onChange(txtValue);
    }
  };

  const handleSave = () => {
    onFormSubmit(value);
    setValue("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.metaKey) {
      event.preventDefault();
      handleSave();
      return false;
    }
  };

  return (
    <div className="row" style={{ marginBottom: "1em" }}>
      <div className="col-md-12 col-sm-12">
        <ReactQuill
          className="form-control"
          placeholder={placeholder}
          theme="bubble"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="col-md-12 col-sm-12">
        <small className="text-muted pull-right">Cmd+Enter to submit</small>
        <button
          className="btn btn-success btn-sm btn-block"
          onClick={handleSave}
          disabled={!value || value.trim() === ""}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Form;
