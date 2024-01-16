import { Editor } from '@tiptap/core';
import { Check, ChevronDown } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { HIGHLIGHT_COLORS, TEXT_COLORS } from './constants';

export interface BubbleColorMenuItem {
  name: string;
  color: string;
}

interface ColorSelectorProps {
  editor: Editor;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ColorSelector = ({
  editor,
  isOpen,
  setIsOpen,
}: ColorSelectorProps) => {
  const activeColorItem = TEXT_COLORS.find(({ color }) => {
    return editor.isActive('textColor', { color });
  });

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) => {
    return editor.isActive('highlight', { color });
  });
  return (
    <Popover.Root open={isOpen}>
      <div className="relative h-full">
        <Popover.Trigger
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-full items-center gap-1 p-2 text-sm font-medium text-stone-600 hover:bg-stone-100 active:bg-stone-200"
        >
          <span
            className="rounded-md px-1"
            style={{
              color: activeColorItem?.color,
              backgroundColor: activeHighlightItem?.color,
            }}
          >
            A
          </span>
          <ChevronDown className="h-4 w-4" />
        </Popover.Trigger>
        <Popover.Content
          align="start"
          className="z-30 my-1 flex max-h-80 w-48 flex-col overflow-hidden overflow-y-auto rounded border border-stone-200 p-1 shadow-xl animate-in fade-in slide-in-from-top-1"
        >
          <p className="my-1 px-2 text-sm text-stone-500">Color</p>
          {TEXT_COLORS.map((item, index) => (
            <button
              key={index}
              className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 hover:bg-stone-100"
              onClick={() => {
                editor.commands.unsetColor();
                item.name !== 'Default' &&
                  editor.chain().focus().setColor(item.color).run();

                setIsOpen(false);
              }}
            >
              <div className="flex items-center space-x-2">
                <p
                  className="rounded-sm border border-stone-200 px-1 py-px font-medium"
                  style={{
                    color: item.color,
                  }}
                >
                  A
                </p>
                <span>{item.name}</span>
              </div>
              {editor.isActive('textStyle', { color: item.color }) && (
                <Check className="h-4 w-4" />
              )}
            </button>
          ))}

          <p className="mb-1 mt-2 px-2 text-sm text-stone-500">Background</p>

          {HIGHLIGHT_COLORS.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                editor.commands.unsetHighlight();
                item.name !== 'Default' &&
                  editor.commands.setHighlight({ color: item.color });
                setIsOpen(false);
              }}
              type="button"
              className="flex items-center justify-between rounded-sm px-2 py-1 text-sm text-stone-600 hover:bg-stone-100"
            >
              <div className="flex items-center space-x-2">
                <p
                  className="rounded-sm border border-stone-200 px-1 py-px font-medium"
                  style={{ backgroundColor: item.color }}
                >
                  A
                </p>
                <span>{item.name}</span>
              </div>
              {editor.isActive('highlight', { color: item.color }) && (
                <Check className="h-4 w-4" />
              )}
            </button>
          ))}
        </Popover.Content>
      </div>
    </Popover.Root>
  );
};
