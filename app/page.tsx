"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as ContextMenu from "@radix-ui/react-context-menu";
import * as Popover from "@radix-ui/react-popover";
import { DropdownContent } from "../components/dropdown-content";
import { PopoverContent } from "../components/popover-content";
import { useRef } from "react";
import { ContextContent } from "../components/context-content";

const DropdownMenuDemo = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const contextRef = useRef<{ getBoundingClientRect: () => DOMRect }>(null);

  return (
    <div className="flex items-center justify-center h-screen gap-4">
      <button className="border-2 border-black px-3 py-1">before</button>
      <Popover.Root>
        <Popover.PopoverAnchor virtualRef={contextRef} />
        <ContextMenu.Root modal={false}>
          <DropdownMenu.Root modal={false}>
            <ContextMenu.Trigger
              asChild
              onContextMenu={(e) => {
                console.log(e.pageX, e.pageY);
                contextRef.current = {
                  getBoundingClientRect: () =>
                    new DOMRect(e.pageX, e.pageY, 0, 0),
                };
              }}
            >
              <div className="w-52 h-52 border-2 border-black flex justify-end items-start">
                {/* <Popover.PopoverAnchor asChild> */}
                <DropdownMenu.Trigger asChild>
                  <button
                    className="w-[35px] h-[35px] translate-x-0.5 -translate-y-0.5 border-2 border-black inline-flex items-center justify-center text-black bg-white"
                    aria-label="Customise options"
                    data-anchor
                    ref={ref}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                      />
                    </svg>
                  </button>
                </DropdownMenu.Trigger>
                {/* </Popover.PopoverAnchor> */}
              </div>
            </ContextMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                sideOffset={5}
                className="bg-white border-2 border-black"
              >
                <DropdownContent />
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
            <ContextMenu.Portal>
              <ContextMenu.Content className="bg-white border-2 border-black">
                <ContextContent />
              </ContextMenu.Content>
            </ContextMenu.Portal>
            <Popover.Portal>
              <Popover.Content
                side="bottom"
                sideOffset={0}
                align="start"
                alignOffset={0}
                className="p-5 w-52 bg-white border-2 border-black"
                onEscapeKeyDown={() => ref.current?.focus()}
              >
                <PopoverContent />

                <Popover.Close
                  className="h-[25px] w-[25px] border-2 border-black inline-flex items-center justify-center text-black absolute top-0 right-0"
                  aria-label="Close"
                  onClick={() => ref.current?.focus()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </Popover.Close>
              </Popover.Content>
            </Popover.Portal>
          </DropdownMenu.Root>
        </ContextMenu.Root>
      </Popover.Root>
      <button className="border-2 border-black px-3 py-1">after</button>
    </div>
  );
};

export default DropdownMenuDemo;
