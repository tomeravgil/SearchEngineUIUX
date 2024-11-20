import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  NewspaperIcon,
  PhotoIcon,
  PlayIcon,
} from '@heroicons/react/20/solid';

export default function DropDown() {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMenuToggle = (open) => {
    console.log(open);
    setIsAnimating(!isAnimating);
  };

  return (
    <div>
      <Menu>
        {({ open }) => (
          <>
            <MenuButton
              onClick={() => handleMenuToggle(open)}
              className="h-full inline-flex items-center gap-2 rounded-md bg-gray-800 py-3 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-700"
            >
              <ChevronDownIcon
                className={`size-5 fill-white/60 transition-transform duration-300 ${
                  isAnimating ? 'rotate-180 scale-110' : ''
                }`}
              />
            </MenuButton>

            <MenuItems
              as="div"
              transition
              anchor="bottom top"
              onClick={() => handleMenuToggle(false)}
              className="w-fit origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm text-white transition duration-100 ease-out scale-95 opacity-0 data-[open]:scale-100 data-[open]:opacity-100 focus:outline-none"
            >
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 focus:bg-white/10">
                  <MagnifyingGlassIcon className="size-4 fill-white/30" />
                  All
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 focus:bg-white/10">
                  <PhotoIcon className="size-4 fill-white/30" />
                  Images
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 focus:bg-white/10">
                  <PlayIcon className="size-4 fill-white/30" />
                  Videos
                </button>
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 focus:bg-white/10">
                  <NewspaperIcon className="size-4 fill-white/30" />
                  News
                </button>
              </MenuItem>
            </MenuItems>
          </>
        )}
      </Menu>
    </div>
  );
}
