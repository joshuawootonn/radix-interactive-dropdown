import * as ContextMenu from "@radix-ui/react-context-menu";
import * as Popover from "@radix-ui/react-popover";

function Item(props: ContextMenu.ContextMenuItemProps) {
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
          <Item>Open Popover</Item>
        </Popover.Trigger>
        <Item>Apple</Item>
        <Item>Banana</Item>
      </ContextMenu.Content>
    </ContextMenu.ContextMenuPortal>
  );
}
