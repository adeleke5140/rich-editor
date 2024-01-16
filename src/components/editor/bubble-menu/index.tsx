import { BubbleMenu, BubbleMenuProps, isNodeSelection } from '@tiptap/react';
import { useState } from 'react';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  StrikethroughIcon,
  CodeIcon,
} from 'lucide-react';
import { NodeSelector } from './nodeSelector';
import { ColorSelector } from './colorSelector';
import { LinkSelector } from './linkSelector';
import { cn } from '../../../lib/utils';
import { type BubbleMenuItem } from './types';

type EditorBubbleMenuProps = Omit<BubbleMenuProps, 'children'>;

export const EditorBubbleMenu = (props: EditorBubbleMenuProps) => {
  const [isNodeSelectorOpen, setIsNodeSelectorOpen] = useState(false);
  const [isColorSelectorOpen, setIsColorSelectorOpen] = useState(false);
  const [isLinkSelectorOpen, setIsLinkSelectorOpen] = useState(false);
  const { editor } = props;
  const items: BubbleMenuItem[] = [
    {
      name: 'bold',
      isActive: () => (editor ? editor?.isActive('bold') : false),
      command: () => editor?.chain().focus().toggleBold().run(),
      icon: BoldIcon,
    },
    {
      name: 'italic',
      isActive: () => (editor ? editor.isActive('italic') : false),
      command: () => editor?.chain().focus().toggleItalic().run(),
      icon: ItalicIcon,
    },
    {
      name: 'underline',
      isActive: () => (editor ? editor.isActive('underline') : false),
      command: () => editor?.chain().focus().toggleUnderline().run(),
      icon: UnderlineIcon,
    },
    {
      name: 'strike',
      isActive: () => (editor ? editor.isActive('strike') : false),
      command: () => editor?.chain().focus().toggleStrike().run(),
      icon: StrikethroughIcon,
    },
    {
      name: 'code',
      isActive: () => (editor ? editor.isActive('code') : false),
      command: () => editor?.chain().focus().toggleCode().run(),
      icon: CodeIcon,
    },
  ];

  const bubbleMenuProps: EditorBubbleMenuProps = {
    ...props,
    shouldShow: (props) => {
      const { selection } = props.state;
      const { empty } = selection;

      if (editor?.isActive('image') || empty || isNodeSelection(selection)) {
        return false;
      }
      return true;
    },
    tippyOptions: {
      moveTransition: 'transform 0.15 ease-out',
      onHidden: () => {
        setIsNodeSelectorOpen(false);
        setIsColorSelectorOpen(false);
        setIsLinkSelectorOpen(false);
      },
    },
  };

  return (
    <>
      <BubbleMenu
        {...bubbleMenuProps}
        className="flex w-fit divide-x divide-stone-500 bg-stone-900  rounded border border-stone-500 shadow-xl"
      >
        <NodeSelector
          editor={editor!}
          isOpen={isNodeSelectorOpen}
          setIsOpen={() => {
            setIsNodeSelectorOpen(!isNodeSelectorOpen);
            setIsColorSelectorOpen(false);
            setIsLinkSelectorOpen(false);
          }}
        />

        <LinkSelector
          editor={editor!}
          isOpen={isLinkSelectorOpen}
          setIsOpen={() => {
            setIsLinkSelectorOpen((prev) => !prev);
            setIsNodeSelectorOpen(false);
            setIsColorSelectorOpen(false);
          }}
        />

        <div className="flex">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.command();
                setIsNodeSelectorOpen(false);
                setIsColorSelectorOpen(false);
                setIsLinkSelectorOpen(false);
              }}
              className="p-2 text-stone-200 hover:bg-stone-800 hover:rounded-md active:bg-stone-200"
              type="button"
            >
              <item.icon
                className={cn('h-4 w-4', item.isActive() && 'text-blue-500')}
              />
            </button>
          ))}
        </div>

        <ColorSelector
          editor={editor!}
          isOpen={isColorSelectorOpen}
          setIsOpen={() => {
            setIsColorSelectorOpen((prev) => !prev);
            setIsNodeSelectorOpen(false);
            setIsLinkSelectorOpen(false);
          }}
        />
      </BubbleMenu>
    </>
  );
};
