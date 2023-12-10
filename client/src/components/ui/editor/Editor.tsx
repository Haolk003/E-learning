import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";

import EditorToolbar from "./EditorToolbar";
import "./Editor.css";

export default ({ editor }: { editor: any }) => {
  return (
    <div className="border rounded-lg shadow-md w-full min-h-[300px]">
      <EditorToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
