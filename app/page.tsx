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
  const ref = useRef<HTMLButtonElement>(null);
  const [virtualRef, setVirtualRef] = useState<null | RefObject<{
    getBoundingClientRect: () => DOMRect;
  }>>(null);
  const [popoverOrigin, setPopoverOrigin] = useState<"dropdown" | "context">(
    "dropdown",
  );

  return (
    <>
      <div className="flex items-center justify-center h-screen gap-4">
        <button className="border-2 border-black px-3 py-1">before</button>
        <Popover.Root>
          {virtualRef && <Popover.PopoverAnchor virtualRef={virtualRef} />}
          <ContextMenu.Root modal={false}>
            <DropdownMenu.Root modal={false}>
              <ContextMenu.Trigger
                asChild
                onContextMenu={(e) => {
                  setVirtualRef({
                    current: {
                      getBoundingClientRect: () =>
                        new DOMRect(e.pageX + 2, e.pageY, 0, 0),
                    },
                  });
                  setPopoverOrigin("context");
                }}
              >
                <div className="w-52 h-52 border-2 border-black flex justify-end items-start">
                  {virtualRef ? (
                    <>
                      <DropdownMenuTrigger
                        onClick={() => {
                          setPopoverOrigin("dropdown");
                        }}
                        ref={ref}
                      />
                    </>
                  ) : (
                    <Popover.PopoverAnchor asChild>
                      <DropdownMenuTrigger
                        onClick={() => {
                          setPopoverOrigin("dropdown");
                        }}
                        ref={ref}
                      />
                    </Popover.PopoverAnchor>
                  )}
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
                <PopoverContent
                  avoidCollisions={false}
                  sideOffset={popoverOrigin === "dropdown" ? 5 : 0}
                  align={popoverOrigin === "dropdown" ? "center" : "start"}
                  className={clsx("p-5 w-52 bg-white border-2 border-black")}
                  onEscapeKeyDown={() => ref.current?.focus()}
                  onPointerDownOutside={() => setVirtualRef(null)}
                >
                  <PopoverClose onClick={() => setVirtualRef(null)} />
                </PopoverContent>
              </Popover.Portal>
            </DropdownMenu.Root>
          </ContextMenu.Root>
        </Popover.Root>
        <button className="border-2 border-black px-3 py-1">after</button>
      </div>
    </>
  );
};

export default DropdownMenuDemo;
