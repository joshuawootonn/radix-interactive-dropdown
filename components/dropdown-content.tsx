import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Popover from "@radix-ui/react-popover";

function Item(props: DropdownMenu.DropdownMenuItemProps) {
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
          <Item>Open Popover</Item>
        </Popover.Trigger>
        <Item>Apple</Item>
        <Item>Banana</Item>
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  );
}
