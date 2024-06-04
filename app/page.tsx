"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as ContextMenu from "@radix-ui/react-context-menu";
import * as Popover from "@radix-ui/react-popover";
import { DropdownContentInteractiveSubContent } from "../components/dropdown-content-with-sub-content";
import { PopoverContent } from "../components/popover-content";
import { useRef, useState } from "react";
import { ContextContent } from "../components/context-content";
import { DropdownMenuTrigger } from "@/components/dropdown-trigger";
import { clsx } from "clsx";
import { DropdownContent } from "@/components/dropdown-content";

const App = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState<DOMRect | null>(null);

  return (
    <>
      <div className="prose mx-auto my-3">
        <h1>
          Recreating Linear&apos;s interactive dropdowns with Radix UI (Demo)
        </h1>
        <p>
          Here is a demo of a menu and dialog composed together for a
          &quot;interactive menu&quot; experience.
        </p>
        <Popover.Root>
          {position && (
            <Popover.PopoverAnchor
              virtualRef={{
                current: {
                  getBoundingClientRect: () => position,
                },
              }}
            />
          )}
          <ContextMenu.Root modal={false}>
            <ContextMenu.Trigger
              onContextMenu={(e) => {
                setPosition(new DOMRect(e.clientX + 2, e.clientY, 0, 0));
              }}
            >
              <Popover.Root>
                <DropdownMenu.Root modal={false}>
                  <div className="w-52 h-52 border-2 border-black flex justify-end items-start my-3">
                    <Popover.PopoverAnchor>
                      <DropdownMenuTrigger ref={buttonRef} />
                    </Popover.PopoverAnchor>
                    <PopoverContent
                      sideOffset={5}
                      align={"center"}
                      className={clsx(
                        "p-5 w-52 bg-white border-2 border-black",
                      )}
                      onCloseAutoFocus={(e) => {
                        e.preventDefault();

                        const isMenuFocused =
                          document.activeElement &&
                          document.activeElement instanceof HTMLElement &&
                          document.activeElement.dataset.radixMenuContent ===
                            "";

                        if (!isMenuFocused) {
                          buttonRef.current?.focus();
                        }
                      }}
                      onContextMenu={(e) => e.stopPropagation()}
                    />
                    <DropdownContent
                      sideOffset={5}
                      className="bg-white border-2 border-black w-28"
                    />
                  </div>
                </DropdownMenu.Root>
              </Popover.Root>
            </ContextMenu.Trigger>
            <ContextContent className="w-28 bg-white border-2 border-black" />
            <PopoverContent
              sideOffset={0}
              align={"start"}
              className={clsx("p-5 w-52 bg-white border-2 border-black")}
            />
          </ContextMenu.Root>
        </Popover.Root>
        <p>
          Interactive sub dropdown menus don&apos;t work in this case because
          their shortcuts conflict with text selection.
        </p>
        <Popover.Root>
          {position && (
            <Popover.PopoverAnchor
              virtualRef={{
                current: {
                  getBoundingClientRect: () => position,
                },
              }}
            />
          )}
          <ContextMenu.Root modal={false}>
            <ContextMenu.Trigger
              onContextMenu={(e) =>
                setPosition(new DOMRect(e.clientX + 2, e.clientY, 0, 0))
              }
            >
              <Popover.Root>
                <DropdownMenu.Root modal={false}>
                  <div className="w-52 h-52 border-2 border-black flex justify-end items-start">
                    <Popover.PopoverAnchor>
                      <DropdownMenuTrigger ref={buttonRef} />
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
                    <DropdownContentInteractiveSubContent
                      sideOffset={5}
                      className="bg-white border-2 border-black w-28"
                    />
                  </div>
                </DropdownMenu.Root>
              </Popover.Root>
            </ContextMenu.Trigger>
            <ContextContent className="w-28 bg-white border-2 border-black" />
            <PopoverContent
              sideOffset={0}
              align={"start"}
              className={clsx("p-5 w-52 bg-white border-2 border-black")}
            />
          </ContextMenu.Root>
        </Popover.Root>
        <p>
          This is a the companion demo to a blog post I have{" "}
          <a href="https://joshuawootonn.com/radix-interactive-dropdown">
            here.
          </a>
        </p>
      </div>
    </>
  );
};

export default App;
