"use client";
import {
  useRef,
  useState,
  RefObject,
  ForwardedRef,
  forwardRef,
  ComponentProps,
} from "react";
import * as ContextMenu from "@radix-ui/react-context-menu";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Popover from "@radix-ui/react-popover";
import { clsx } from "clsx";

function Label(props: ComponentProps<"label">) {
  return <label className="text-[13px] text-black w-20" {...props} />;
}

function Input(props: ComponentProps<"input">) {
  return (
    <input
      className="inline-flex items-center w-20 justify-center flex-1 px-2.5 py-1 text-[13px] leading-none text-black border-2 border-black outline-none focus:rounded-0"
      {...props}
    />
  );
}

export function PopoverContent(props: Popover.PopoverContentProps) {
  return (
    <Popover.PopoverPortal>
      <Popover.Content {...props} asChild>
        <div className="flex flex-col gap-2.5">
          <p className=" text-[15px] leading-[19px] font-medium mb-2.5">
            Dimensions
          </p>
          <fieldset className="flex gap-2 items-center">
            <Label htmlFor="width">Width</Label>
            <Input id="width" defaultValue="100%" />
          </fieldset>
          <fieldset className="flex gap-2 items-center">
            <Label htmlFor="maxWidth">Max. width</Label>
            <Input id="maxWidth" defaultValue="300px" />
          </fieldset>
          <fieldset className="flex gap-2 items-center">
            <Label htmlFor="height">Height</Label>
            <Input id="height" defaultValue="25px" />
          </fieldset>
          <fieldset className="flex gap-2 items-center">
            <Label htmlFor="maxHeight">Max. height</Label>
            <Input id="maxHeight" defaultValue="none" />
          </fieldset>
          {props.children}
        </div>
      </Popover.Content>
    </Popover.PopoverPortal>
  );
}

export function PopoverClose(props: Popover.PopoverCloseProps) {
  return (
    <div className="absolute top-0 right-0">
      <Popover.Close
        className="relative svg-outline h-[25px] w-[25px] border-2 border-black inline-flex items-center justify-center text-black"
        aria-label="Close"
        {...props}
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
    </div>
  );
}

function DropdownMenuItem(props: DropdownMenu.DropdownMenuItemProps) {
  return (
    <DropdownMenu.Item
      className="group text-[13px] leading-none text-black flex items-center px-3 py-2 relative select-none outline-none hover:text-white hover:bg-black focus:text-white focus:bg-black"
      {...props}
    />
  );
}

export function DropdownContent(props: DropdownMenu.DropdownMenuContentProps) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.Content {...props}>
        <Popover.Trigger asChild>
          <DropdownMenuItem>Open Popover</DropdownMenuItem>
        </Popover.Trigger>
        <DropdownMenuItem>Apple</DropdownMenuItem>
        <DropdownMenuItem>Banana</DropdownMenuItem>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}

function ContextMenuItem(props: ContextMenu.ContextMenuItemProps) {
  return (
    <ContextMenu.Item
      className="group text-[13px] leading-none text-black flex items-center px-3 py-2 relative select-none outline-none hover:text-white hover:bg-black focus:text-white focus:bg-black"
      {...props}
    />
  );
}

export function ContextContent(props: ContextMenu.ContextMenuContentProps) {
  return (
    <ContextMenu.ContextMenuPortal>
      <ContextMenu.Content {...props}>
        <Popover.Trigger asChild>
          <ContextMenuItem>Open Popover</ContextMenuItem>
        </Popover.Trigger>
        <ContextMenuItem>Apple</ContextMenuItem>
        <ContextMenuItem>Banana</ContextMenuItem>
      </ContextMenu.Content>
    </ContextMenu.ContextMenuPortal>
  );
}

export const DropdownMenuTrigger = forwardRef(function DropdownMenuTrigger(
  props: DropdownMenu.DropdownMenuTriggerProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <DropdownMenu.Trigger asChild {...props}>
      <button
        className="relative svg-outline w-[35px] h-[35px] translate-x-0.5 -translate-y-0.5 border-2 border-black inline-flex items-center justify-center text-black bg-white"
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
  );
});

export const App = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [virtualRef, setVirtualRef] = useState<null | RefObject<{
    getBoundingClientRect: () => DOMRect;
  }>>(null);

  return (
    <div className="flex items-center justify-center gap-4">
      <Popover.Root>
        <ContextMenu.Root modal={false}>
          <ContextMenu.Trigger
            asChild
            onContextMenu={(e) => {
              setVirtualRef({
                current: {
                  getBoundingClientRect: () =>
                    new DOMRect(e.clientX + 2, e.clientY, 0, 0),
                },
              });
            }}
          >
            <div className="w-52 h-52 border-2 border-black flex justify-end items-start">
              <DropdownMenu.Root modal={false}>
                <Popover.Root>
                  <Popover.PopoverAnchor
                    virtualRef={virtualRef || undefined}
                    asChild
                  >
                    <DropdownMenuTrigger
                      onClick={() => setVirtualRef(null)}
                      ref={buttonRef}
                    />
                  </Popover.PopoverAnchor>
                  <PopoverContent
                    sideOffset={5}
                    align={"center"}
                    className={clsx("p-5 w-52 bg-white border-2 border-black")}
                    onCloseAutoFocus={(e) => {
                      e.preventDefault();
                      buttonRef.current?.focus();
                    }}
                  >
                    <PopoverClose />
                  </PopoverContent>
                </Popover.Root>
              </DropdownMenu.Root>
            </div>
          </ContextMenu.Trigger>
          <DropdownContent
            sideOffset={5}
            className="bg-white border-2 border-black"
          />
          <ContextContent className="bg-white border-2 border-black" />
          <PopoverContent
            sideOffset={0}
            align={"start"}
            className={clsx("p-5 w-52 bg-white border-2 border-black")}
            onCloseAutoFocus={(e) => {
              e.preventDefault();
              setVirtualRef(null);
              buttonRef.current?.focus();
            }}
          >
            <PopoverClose />
          </PopoverContent>
        </ContextMenu.Root>
      </Popover.Root>
    </div>
  );
};

export default App;
