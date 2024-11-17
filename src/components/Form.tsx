import React, { useState } from "react";
import ReactQuill from "react-quill";

type FormProps = {
  onChange?: (newValue: string) => void;
  onFormSubmit: (newValue: string) => void;
  onCancel: () => void;
  initialValue: string | undefined;
  placeholder?: string;
};

function Form(props: FormProps) {
  const {
    placeholder = "how was your day?",
    initialValue,
    onChange,
    onFormSubmit,
    onCancel,
  } = props;
  const [txtValue, setTxtValue] = useState(initialValue || "");

  const handleOnChange = (newValue: string) => {
    setTxtValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const onSave = () => {
    onFormSubmit(txtValue);
    setTxtValue("");
  };

  const handleCancel = () => {
    onCancel();
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
      <div className="col-md-12 col-sm-1 mb-4">
        <ReactQuill
          className="form-control"
          placeholder={placeholder}
          theme="snow"
          value={txtValue}
          onChange={(txtValue) => handleOnChange(txtValue)}
          onKeyDown={(e) => onKeyDown(e)}
        />
      </div>

      <div className="col-md-12 col-sm-12">
        <small className="text-muted pull-right">Cmd+Enter to submit</small>

        <div className="d-grid gap-2 d-md-block">
          <button
            className="btn btn-secondary mr-3"
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="btn btn-success"
            type="button"
            onClick={onSave}
            disabled={!txtValue || txtValue.trim() === ""}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Form;
