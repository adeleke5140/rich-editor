import {
  Heading1,
  Heading2,
  Heading3,
  Text,
  List,
  ListOrdered,
  TextQuote,
  CodeIcon,
} from 'lucide-react';
import { Command } from './Command';

export const getSuggestionItems = ({ query }: { query: string }) => {
  return [
    {
      title: 'Heading 1',
      description: 'Big section heading.',
      searchTerms: ['title', 'big', 'large'],
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
      searchTerms: ['subtitle', 'medium'],
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
      searchTerms: ['subtitle', 'small'],
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
      searchTerms: ['p', 'paragraph'],
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
      title: 'BulletList',
      description: 'Create a simple bullet list',
      searchTerms: ['unordered', 'point'],
      icon: <List size={14} />,
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).toggleBulletList().run();
      },
    },
    {
      title: 'Numbered List',
      description: 'Create a list with numbering',
      searchTerms: ['ordered'],
      icon: <ListOrdered size={14} />,
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).toggleOrderedList().run();
      },
    },
    {
      title: 'Quote',
      description: 'Capture a quote.',
      searchTerms: ['blockquote', 'quote'],
      icon: <TextQuote size={14} />,
      command: ({ editor, range }: Command) => {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .toggleNode('paragraph', 'paragraph')
          .toggleBlockquote()
          .run();
      },
    },
    {
      title: 'Code',
      description: 'Capture a code snippet.',
      searchTerms: ['code'],
      icon: <CodeIcon size={14} />,
      command: ({ editor, range }: Command) => {
        editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
      },
    },
  ].filter((item) => {
    if (typeof query === 'string' && query.length > 0) {
      const search = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search) ||
        (item.searchTerms &&
          item.searchTerms.some((term) => term.includes(search)))
      );
    }
    return true;
  });
};
