import Suggestion from '@tiptap/suggestion';

import { Extension, Editor, Range } from '@tiptap/core';
import { getSuggestionItems } from './items';
import { renderItems } from './renderItems';

export interface CommandItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Command {
  editor: Editor;
  range: Range;
  props: any;
}

export const Commands = Extension.create({
  name: 'slash-command',

  addOptions() {
    return {
      suggestion: {
        char: '/',
        command: ({ editor, range, props }: Command) => {
          props.command({ editor, range });
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
});

export const SlashCommand = Commands.configure({
  suggestion: {
    items: getSuggestionItems,
    render: renderItems,
  },
});
