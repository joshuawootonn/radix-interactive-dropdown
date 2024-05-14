# Radix Popover Submenu

The Radix `ContextMenu.Sub` and `DropdownMenu.Sub` have an opinionated UX where focus changes `onPointerMove` and buttons are your only interactive option.
If this is the UX you are going for then great! But if you want to use an `input` within a `Sub` then it's actually better to just open a popover from the original menu.
This repo will show you how.

There is a blog post coming shortly it will cover how to use the `virtualRef` property of the `PopoverContent` to position it exactly where the `ContextMenu` was opened and how
manage focus so that our original trigger is focused when the popover is closed.
