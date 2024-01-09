import './App.css';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useEditor, EditorContent } from '@tiptap/react';
import { useState, useEffect } from 'react';

export const TipTapEditorExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1],
      HTMLAttributes: {
        class: 'text-purple-20-',
      },
    },
  }),
  Placeholder.configure({
    placeholder: 'Start typing...',
    includeChildren: true,
  }),
];

function App() {
  const editor = useEditor({
    extensions: [...TipTapEditorExtensions],
    content: '<p>Start Writing...</p>',
    editorProps: {
      attributes: {
        class: 'h-full text-left p-2 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      console.log(editor.getJSON());
    },
  });
  return (
    <>
      <p className="text-4xl font-serif text-purple-200">
        This is my Rich Editor
      </p>
      <div className="max-w-80 h-40 rounded bg-white text-black">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </>
  );
}

export default App;
