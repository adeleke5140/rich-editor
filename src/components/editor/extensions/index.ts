import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import { Underline } from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { Markdown } from 'tiptap-markdown';
import StarterKit from '@tiptap/starter-kit';

import { InputRule } from '@tiptap/core';
import { DragAndDrop } from './drag-and-drop';
import { CustomKeymap } from './custom-keymap';
import { SlashCommand } from '../../Command';

export const TipTapEditorExtensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: 'list-disc list-outside leading-3 -mt-2',
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: 'list-decimal list-outside leading-3 -mt-2',
      },
    },
    listItem: {
      HTMLAttributes: {
        class: 'leading-normal -mb-2',
      },
    },
    blockquote: {
      HTMLAttributes: {
        class: 'border-l-4 border-stone-700',
      },
    },
    codeBlock: {
      HTMLAttributes: {
        class:
          'rounded-sm bg-stone-100 p-5 font-mono font-medium text-stone-800',
      },
    },
    code: {
      HTMLAttributes: {
        class:
          'rounded-md bg-stone-200 px-1.5 py-1 font-mono font-medium text-stone-900',
        spellcheck: 'true',
      },
    },
    horizontalRule: false,
    dropcursor: {
      color: '#DBEAFE',
      width: 4,
    },
    gapcursor: false,
  }),
  HorizontalRule.extend({
    addInputRules() {
      return [
        new InputRule({
          find: /^(?:---|—-|___\s|\*\*\*\s)$/,
          handler: ({ state, range }) => {
            const attributes = {};

            const { tr } = state;
            const start = range.from;
            let end = range.to;

            tr.insert(start - 1, this.type.create(attributes)).delete(
              tr.mapping.map(start),
              tr.mapping.map(end)
            );
          },
        }),
      ];
    },
  }).configure({
    HTMLAttributes: {
      class: 'novel-mt-4 novel-mb-6 novel-border-t novel-border-stone-300',
    },
  }),
  Link.configure({
    HTMLAttributes: {
      class:
        'text-stone-300 underline underline-offset-[3px] hover:text-stone-600 transition-colors cursor-pointer',
    },
  }),
  Placeholder.configure({
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return `Heading ${node.attrs.level}`;
      }
      return 'Press / for commands...';
    },
    includeChildren: true,
  }),
  TaskList.configure({
    HTMLAttributes: {
      class: 'novel-not-prose novel-pl-2',
    },
  }),
  TaskItem,
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  Underline,
  DragAndDrop,
  CustomKeymap,
  Markdown.configure({
    html: false,
    transformCopiedText: true,
    transformPastedText: true,
  }),
  SlashCommand,
];
