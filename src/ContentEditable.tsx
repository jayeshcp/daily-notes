import React from "react";
import ReactQuill from "react-quill";

type ContentEditableProps = {
  initialValue: string,
}

function ContentEditable(props: ContentEditableProps) {
  const { initialValue } = props;

  return (
    <div className="content">
      <ReactQuill
        theme="bubble"
        value={initialValue}
        readOnly
      />
    </div>
  );
}

export default ContentEditable;
