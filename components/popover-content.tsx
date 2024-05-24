import * as Popover from "@radix-ui/react-popover";
import { ComponentProps } from "react";
import { PopoverClose } from "./popover-close";

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
          <PopoverClose />
        </div>
      </Popover.Content>
    </Popover.PopoverPortal>
  );
}
