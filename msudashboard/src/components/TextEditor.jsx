import React from "react";
import ReactDOM from "react-dom";
import JoditEditor from "jodit-react";

function TextEditor({ text, setText }) {
  const editor = React.useRef(null);
  const [content, setContent] = React.useState("");

  function Change(text) {
    setContent(text);
    setText(text);
  }

  React.useEffect(() => {
    if (text !== undefined) {
      setContent(text);
    }
  }, [text]);

  const config = {
    readonly: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
    language: "ru",
    minHeight: 400,
  };
  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1}
      onBlur={(newContent) => Change(newContent)}
      onChange={(newContent) => {}}
    />
  );
}

export default TextEditor;
