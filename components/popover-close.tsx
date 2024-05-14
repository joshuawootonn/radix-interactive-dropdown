import { Close, PopoverCloseProps } from "@radix-ui/react-popover";

export function PopoverClose(props: PopoverCloseProps) {
  return (
    <Close
      className="h-[25px] w-[25px] border-2 border-black inline-flex items-center justify-center text-black absolute top-0 right-0"
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
    </Close>
  );
}
