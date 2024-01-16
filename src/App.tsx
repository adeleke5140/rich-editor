import { useEditor, EditorContent } from '@tiptap/react';
import { Editor } from '@tiptap/core';

import { useState } from 'react';

import { EditorBubbleMenu } from './components/editor/bubble-menu';
import { TipTapEditorExtensions } from './components/editor/extensions';
import { TipTapEditorProps } from './components/editor/props';
import applyDevTools from 'prosemirror-dev-tools';

//show prosemirror dev tools
const DEV_MODE = import.meta.env.DEV;

const searchParams = new URLSearchParams(window.location.search);
const debugParam = searchParams.get('debug');

//show devtools in dev environment or in dev mode
const DEBUG = debugParam === 'true' ? debugParam : DEV_MODE;

const fonts = [
  {
    name: 'default',
    fontFamily: 'Atkinson Hyperlegible, sans-serif',
  },
  {
    name: 'serif',
    fontFamily: 'Spectral, serif',
  },
  {
    name: 'mono',
    fontFamily: 'Ubuntu Mono, monospace',
  },
];

const defaultFont = fonts[0].fontFamily;

function App() {
  const [content, setContent] = useState<ReturnType<Editor['getJSON']> | null>(
    null
  );
  const [fontFamily, setFontFamily] = useState(defaultFont);

  const updateContent = (editor: Editor) => {
    const json = editor.getJSON();

    setContent(json);
  };
  const editor = useEditor({
    onCreate({ editor }) {
      DEBUG ? applyDevTools(editor.view) : null;
    },
    extensions: [...TipTapEditorExtensions],
    content,
    editorProps: TipTapEditorProps,
    onUpdate: ({ editor }) => {
      updateContent(editor);
    },
  });
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="ml-auto text-white m-4 space-y-2">
        <h1 className="font-bold text-lg">Font</h1>
        <div className="flex gap-2">
          {fonts.map((font) => (
            <button
              key={font.fontFamily}
              onClick={() => {
                setFontFamily(font.fontFamily);
              }}
              className={`border border-stone-400 p-2 rounded-md text-sm capitalize ${
                font.fontFamily === fontFamily
                  ? 'bg-stone-700 text-white font-semibold'
                  : ''
              }`}
            >
              {font.name}
            </button>
          ))}
        </div>
      </div>
      <div
        onClick={() => {
          editor?.chain().focus().run();
        }}
        className="relative mt-8 p-4 min-h-[500px] w-full max-w-screen-lg border-stone-200 sm:rounded-lg sm:border sm:shadow-lg mx-auto"
        style={{
          fontFamily,
        }}
      >
        {editor && <EditorBubbleMenu editor={editor} />}
        <EditorContent editor={editor} className="h-full" />
      </div>
      <footer className="text-stone-200 mt-2">© kepler</footer>
    </div>
  );
}

export default App;
