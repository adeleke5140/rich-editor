import { cn, getUrlFromString } from '../../../lib/utils';
import { Editor } from '@tiptap/core';
import { Check, Trash } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

interface LinkSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const LinkSelector = ({
  editor,
  isOpen,
  setIsOpen,
}: LinkSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = inputRef.current;
    if (isOpen && input) {
      input.focus();
    }
  });

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="flex h-full items-center space-x-2 hover:bg-stone-800 hover:rounded-md px-3 py-1.5 text-sm font-medium text-stone-200  active:bg-stone-200"
      >
        <p className="text-base">↗</p>
        <p
          className={cn(
            'underline decoration-stone-400 underline-offset-4',
            editor.isActive('link') && 'text-blue-500'
          )}
        >
          Link
        </p>
      </button>
      {isOpen && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const input = e.currentTarget[0] as HTMLInputElement;
            const url = getUrlFromString(input.value);
            url && editor.chain().focus().setLink({ href: url }).run();
            setIsOpen(false);
          }}
          className="fixed top-full z-30 bg-stone-800 mt-1 flex w-60 overflow-hidden rounded border border-stone-200 p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Paste a link"
            defaultValue={editor.getAttributes('link').href || ''}
            className="flex-1 p-1 text-stone-200 bg-stone-700 text-sm outline-none"
          />
          {editor.getAttributes('link').href ? (
            <button
              type="button"
              onClick={() => {
                editor.chain().focus().unsetLink().run();
                setIsOpen(false);
              }}
              className="flex items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-800"
            >
              <Trash className="h-4 w-4" />
            </button>
          ) : (
            <button className="flex items-center rounded-sm p-1 text-stone-600 transition-all hover:bg-stone-100">
              <Check className="h-4 w-4" />
            </button>
          )}
        </form>
      )}
    </div>
  );
};
