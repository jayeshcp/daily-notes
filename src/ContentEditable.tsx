import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "./style.css";

type ContentEditableProps = {
  initialValue: string,
  onContentChanged: (string) => void
}

const ContentEditable: React.FC<ContentEditableProps> = ({
  initialValue = "",
  onContentChanged
}) => {
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(initialValue);

  useEffect(() => {
    if (!editing) {
      onContentChanged(content);
    }
  }, [editing, content, onContentChanged]);

  return (
    <div className={editing ? "normal" : "content"}>
      <ReactQuill
        theme="bubble"
        value={content}
        onChange={setContent}
        onFocus={() => setEditing(true)}
        onBlur={() => setEditing(false)}
      />
    </div>
  );
};

export default ContentEditable;
