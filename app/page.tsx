"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as ContextMenu from "@radix-ui/react-context-menu";
import * as Popover from "@radix-ui/react-popover";
import { DropdownContent } from "../components/dropdown-content";
import { PopoverContent } from "../components/popover-content";
import { useRef, useState, RefObject } from "react";
import { ContextContent } from "../components/context-content";
import { PopoverClose } from "@/components/popover-close";
import { DropdownMenuTrigger } from "@/components/dropdown-trigger";
import { clsx } from "clsx";

const DropdownMenuDemo = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [virtualRef, setVirtualRef] = useState<null | RefObject<{
    getBoundingClientRect: () => DOMRect;
  }>>(null);

  return (
    <>
      <div className="flex items-center justify-center h-screen gap-4">
        <button className="relative svg-outline border-2 border-black px-3 py-1">
          before
        </button>
        <Popover.Root>
          {virtualRef && <Popover.PopoverAnchor virtualRef={virtualRef} />}
          <ContextMenu.Root modal={false}>
            <ContextMenu.Trigger
              onContextMenu={(e) => {
                setVirtualRef({
                  current: {
                    getBoundingClientRect: () =>
                      new DOMRect(e.clientX + 2, e.clientY, 0, 0),
                  },
                });
              }}
            >
              <Popover.Root>
                <DropdownMenu.Root modal={false}>
                  <div className="w-52 h-52 border-2 border-black flex justify-end items-start">
                    <Popover.PopoverAnchor>
                      <DropdownMenuTrigger
                        onClick={() => setVirtualRef(null)}
                        ref={buttonRef}
                      />
                    </Popover.PopoverAnchor>
                    <PopoverContent
                      sideOffset={5}
                      align={"center"}
                      className={clsx(
                        "p-5 w-52 bg-white border-2 border-black",
                      )}
                      onCloseAutoFocus={(e) => {
                        e.preventDefault();
                        buttonRef.current?.focus();
                      }}
                    />
                    <DropdownContent
                      sideOffset={5}
                      className="bg-white border-2 border-black"
                    />
                  </div>
                </DropdownMenu.Root>
              </Popover.Root>
            </ContextMenu.Trigger>
            <ContextContent className="bg-white border-2 border-black" />
            <PopoverContent
              sideOffset={0}
              align={"start"}
              className={clsx("p-5 w-52 bg-white border-2 border-black")}
            />
          </ContextMenu.Root>
        </Popover.Root>
        <button className="relative svg-outline border-2 border-black px-3 py-1">
          after
        </button>
      </div>
    </>
  );
};

export default DropdownMenuDemo;
