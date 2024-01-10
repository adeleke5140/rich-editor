import { useState, useRef, useCallback, useEffect } from 'react';
import { CommandItemProps } from './Command';

export const CommandList = ({
  items,
  command,
}: {
  items: CommandItemProps[];
  command: (item: CommandItemProps) => void;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const commandListContainer = useRef<HTMLDivElement>(null);
  const selectedButtonRef = useRef<HTMLButtonElement>(null);

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
    const onKeyDown = (event: KeyboardEvent) => {
      if (navigationKeys.includes(event.key)) {
        event.preventDefault();
        if (event.key === 'ArrowUp') {
          setSelectedIndex((selectedIndex + items.length - 1) % items.length);
          return true;
        }
        if (event.key === 'ArrowDown') {
          setSelectedIndex((selectedIndex + 1) % items.length);
          return true;
        }
        if (event.key === 'Enter') {
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
  }, [items, selectItem, selectedIndex, setSelectedIndex]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [items]);

  useEffect(() => {
    const container = commandListContainer.current;
    const selectedButton = selectedButtonRef.current;

    if (container && selectedButton) {
      container.scrollTop = selectedButton.offsetTop - container.offsetTop;

      selectedButton.focus();
    }
  }, [selectedIndex, items]);

  return items.length > 0 ? (
    <div
      ref={commandListContainer}
      className="z-30 flex flex-col shadow-dark gap-2 max-h-[330px] bg-[rgb(37_37_37)] w-72 overflow-y-auto scroll-smooth rounded-md px-1 py-1 transition-all"
    >
      <p className="p-2 text-text-color font-medium select-none">
        Basic blocks
      </p>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <button
            key={item.title}
            ref={index === selectedIndex ? selectedButtonRef : null}
            className={`flex items-center hover:bg-hover-color space-x-2 w-full p-2 rounded-md hover:bg-gray-100 focus:outline-none ${
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
              <div className="text-sm font-medium text-white">{item.title}</div>
              <div className="text-xs text-[rgb(127_127_127)]">
                {item.description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  ) : null;
};
