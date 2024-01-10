import {
  Heading1,
  Heading2,
  Heading3,
  Text,
  List,
  ListOrdered,
} from 'lucide-react';
import { Command } from './Command';

export const getSuggestionItems = ({ query }: { query: string }) => {
  return [
    {
      title: 'Heading 1',
      description: 'Big section heading.',
      icon: <Heading1 size={14} />,
      command: ({ editor, range }: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 1 })
          .run();
      },
    },
    {
      title: 'Heading 2',
      description: 'Medium section heading.',
      icon: <Heading2 size={14} />,
      command: ({ editor, range }: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 2 })
          .run();
      },
    },
    {
      title: 'Heading 3',
      description: 'Small section heading.',
      icon: <Heading3 size={14} />,
      command: ({ editor, range }: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setNode('heading', { level: 3 })
          .run();
      },
    },
    {
      title: 'Text',
      description: 'Just start writing some text',
      icon: <Text size={14} />,
      command: ({ editor, range }: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode('paragraph', 'paragraph')
          .run();
      },
    },
    {
      title: 'Bulleted List',
      description: 'Create a simple bulleted list',
      icon: <List size={14} />,
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: 'Numbered List',
      description: 'Create a simple numbered list',
      icon: <ListOrdered size={14} />,
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
  ].filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
};
