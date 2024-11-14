import React, { useState } from "react";
import ReactQuill from "react-quill";
import "./style.css";

type ContentEditableProps = {
  initialValue: string,
  onContentChanged: (newValue: string) => void
}

function ContentEditable(props: ContentEditableProps) {
  const { initialValue, onContentChanged } = props;

  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(initialValue);

  const handleContentChanged = () => {
    setEditing(!editing);
    onContentChanged(content);
  };

  return (
    <div className={editing ? "normal" : "content"}>
      <ReactQuill
        theme="bubble"
        value={content}
        onChange={(content) => setContent(content)}
        onFocus={() => setEditing(!editing)}
        onBlur={() => handleContentChanged()}
      />
    </div>
  );
}

export default ContentEditable;
