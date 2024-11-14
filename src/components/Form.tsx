import React, { useState } from "react";
import ReactQuill from "react-quill";

type FormProps = {
  onChange?: (newValue: string) => void,
  onFormSubmit: (newValue: string) => void,
  placeholder?: string
}

function Form(props: FormProps) {
  const { placeholder = 'how was your day?', onChange, onFormSubmit } = props;
  const [txtValue, setTxtValue] = useState('');

  const handleOnChange = (newValue: string) => {
    setTxtValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const onSave = () => {
    onFormSubmit(txtValue);
    setTxtValue('');
  };

  const onKeyDown = (event: any) => {
    if (event.key === "Enter" && event.metaKey) {
      event.preventDefault();
      onSave();
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
          value={txtValue}
          onChange={(txtValue) => handleOnChange(txtValue)}
          onKeyDown={(e) => onKeyDown(e)}
        />
      </div>

      <div className="col-md-12 col-sm-12">
        <small className="text-muted pull-right">Cmd+Enter to submit</small>
        <button
          className="btn btn-success btn-sm btn-block"
          onClick={onSave}
          disabled={!txtValue || txtValue.trim() === ""}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Form;
