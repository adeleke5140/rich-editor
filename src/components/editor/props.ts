import { EditorProps } from '@tiptap/pm/view';

export const TipTapEditorProps: EditorProps = {
  attributes: {
    class:
      'h-full text-white text-left p-2 prose-lg prose-stone prose-headings:font-title font-default focus:outline-none max-w-full',
  },
  handleDOMEvents: {
    keydown: (_view, event) => {
      if (['ArrowUp', 'ArrowDown', 'Enter'].includes(event.key)) {
        const slashCommand = document.querySelector('#slash-command');
        if (slashCommand) {
          return true;
        }
      }
    },
  },
  handlePaste: (view, event) => {
    if (
      event.clipboardData &&
      event.clipboardData.files &&
      event.clipboardData.files[0]
    ) {
      //for uploading images or vidoes or other types of file that are copied and pasted into the editor
      event.preventDefault();
      const file = event.clipboardData.files[0];
      const pos = view.state.selection.from;

      return true;
    }
    return false;
  },
  handleDrop: (view, event, _slice, moved) => {
    if (
      !moved &&
      event.dataTransfer &&
      event.dataTransfer.files &&
      event.dataTransfer.files[0]
    ) {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      const coord = view.posAtCoords({
        left: event.clientX,
        top: event.clientY,
      });

      //upload dropped file
      return true;
    }
    return false;
  },
};
