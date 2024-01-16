import { useEditor, EditorContent } from '@tiptap/react';
import { Editor } from '@tiptap/core';

import { useState } from 'react';

import { EditorBubbleMenu } from './components/editor/bubble-menu';
import { TipTapEditorExtensions } from './components/editor/extensions';
import { TipTapEditorProps } from './components/editor/props';
import applyDevTools from 'prosemirror-dev-tools';

function App() {
  const [content, setContent] = useState<ReturnType<Editor['getJSON']> | null>(
    null
  );

  const updateContent = (editor: Editor) => {
    const json = editor.getJSON();

    setContent(json);
  };
  const editor = useEditor({
    onCreate({ editor }) {
      applyDevTools(editor.view);
    },
    extensions: [...TipTapEditorExtensions],
    content,
    editorProps: TipTapEditorProps,
    onUpdate: ({ editor }) => {
      updateContent(editor);
    },
  });
  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className="p-2 relative max-w-2xl mx-auto min-h-screen"
    >
      {editor && <EditorBubbleMenu editor={editor} />}
      <EditorContent editor={editor} className="h-full" />
    </div>
  );
}

export default App;
