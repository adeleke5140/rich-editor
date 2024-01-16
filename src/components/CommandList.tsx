import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react';
import { CommandItemProps } from './Command';
import { updateScrollView } from '../lib/utils';

export const CommandList = ({
  items,
  command,
}: {
  items: CommandItemProps[];
  command: any;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const commandListContainer = useRef<HTMLDivElement>(null);

  const selectItem = useCallback(
    (index: number) => {
      const item = items[index];
      if (item) {
        command(item);
      }
    },
    [command, items]
  );

  useEffect(() => {
    const navigationKeys = ['ArrowUp', 'ArrowDown', 'Enter'];
    const onKeyDown = (e: KeyboardEvent) => {
      if (navigationKeys.includes(e.key)) {
        e.preventDefault();
        if (e.key === 'ArrowUp') {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length);
          return true;
        }
        if (e.key === 'ArrowDown') {
          setSelectedIndex((selectedIndex + 1) % items.length);
          return true;
        }
        if (e.key === 'Enter') {
          selectItem(selectedIndex);
          return true;
        }
        return false;
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [items, selectedIndex, setSelectedIndex, selectItem]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  useLayoutEffect(() => {
    const container = commandListContainer?.current;

    const item = container?.children[selectedIndex] as HTMLElement;

    if (item && container) updateScrollView(container, item);
  }, [selectedIndex]);

  return items.length > 0 ? (
    <div
      ref={commandListContainer}
      id="slash-command"
      className="z-30 flex h-auto border border-stone-700 flex-col  shadow-dark gap-2 max-h-[330px] bg-[rgb(37_37_37)] w-72 overflow-y-auto scroll-smooth rounded-md p-2 transition-all"
    >
      {items.map((item, index) => (
        <button
          key={item.title}
          className={`flex items-center hover:bg-hover-color space-x-2 w-full px-2 py-1 rounded-md hover:bg-gray-100 focus:outline-none ${
            index === selectedIndex ? 'bg-hover-color' : ''
          }`}
          onClick={() => {
            selectItem(index);
          }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white">
            {item.icon}
          </div>
          <div className="flex flex-col text-left">
            <p className="text-sm font-medium text-white">{item.title}</p>
            <p className="text-xs text-[rgb(127_127_127)]">
              {item.description}
            </p>
          </div>
        </button>
      ))}
    </div>
  ) : null;
};
