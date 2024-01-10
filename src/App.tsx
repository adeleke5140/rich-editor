import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useEditor, EditorContent } from '@tiptap/react';
import { Editor } from '@tiptap/core';
import { getSuggestionItems } from './components/items';
import { renderItems } from './components/renderItems';
import { Commands } from './components/Command';
import { useEffect, useState } from 'react';

const SlashCommand = Commands.configure({
  suggestion: {
    items: getSuggestionItems,
    render: renderItems,
  },
});

export const TipTapEditorExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
      HTMLAttributes: {
        class: 'text-white',
      },
    },
    paragraph: {
      HTMLAttributes: {
        class: 'text-white',
      },
    },
    listItem: {
      HTMLAttributes: {
        class: 'text-white',
      },
    },
  }),
  Placeholder.configure({
    placeholder: 'Press / for commands...',
    includeChildren: true,
  }),
  SlashCommand,
];

function App() {
  const [content, setContent] = useState<ReturnType<Editor['getJSON']> | null>(
    null
  );

  const updateContent = (editor: Editor) => {
    const json = editor.getJSON();

    setContent(json);
  };
  const editor = useEditor({
    extensions: [...TipTapEditorExtensions],
    content,
    editorProps: {
      attributes: {
        class:
          'h-full text-white prose prose-headings:font-display text-left p-2 focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      updateContent(editor);
    },
  });
  return (
    <div
      onClick={() => {
        editor?.chain().focus().run();
      }}
      className="p-2 max-w-2xl mx-auto min-h-screen"
    >
      <div className="space-y-4 text-white">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
}

export default App;
