import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";

import EditorToolbar from "./EditorToolbar";
import "./Editor.css";

const Editor = ({ editor }: { editor: any }) => {
  return (
    <div className={`border rounded-lg shadow-md w-full relative  `}>
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
export default Editor;
