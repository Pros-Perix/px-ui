import { cva } from "class-variance-authority";

export const DROPDOWN_ITEM_CN =
  "gap-2 py-2 pr-8 pl-4 text-ppx-sm flex cursor-default items-center outline-none select-none not-data-disabled:data-highlighted:bg-ppx-primary-b-1 data-selected:bg-ppx-primary-1! data-checked:bg-ppx-primary-1! text-ppx-foreground my-0.5 data-disabled:opacity-50";

export const DROPDOWN_POPUP_CN =
  "rounded-ppx-s shadow-xs max-h-[var(--available-height)] origin-[var(--transform-origin)] overflow-y-auto bg-ppx-background bg-clip-padding shadow-ppx-neutral-5 outline-1 outline-ppx-neutral-5 transition-[transform,scale,opacity] data-[ending-style]:scale-90 data-[ending-style]:opacity-0 data-[side=none]:data-[ending-style]:transition-none data-[starting-style]:scale-90 data-[starting-style]:opacity-0 data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100 data-[side=none]:data-[starting-style]:transition-none group  max-w-[var(--available-width)] text-ppx-foreground";

export const DROPDOWN_POSITIONER_CN = "z-10 outline-none";

export const triggerVariants = cva(
  "gap-2 text-ppx-sm bg-ppx-neutral-1 inline-flex items-center justify-between border border-ppx-neutral-5 aria-invalid:border-ppx-red-4 text-ppx-foreground outline-transparent p-input focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ppx-neutral-6 focus-visible:aria-invalid:outline-transparent data-disabled:cursor-not-allowed data-disabled:border-ppx-neutral-3 data-disabled:bg-ppx-neutral-3 data-disabled:text-ppx-neutral-11 data-popup-open:brightness-97",
  {
    variants: {
      size: {
        default: "rounded-input min-h-input h-input",
        sm: "rounded-input-s min-h-input-s h-input-s",
      },
      widthVariant: {
        enforced: "min-w-input w-[var(--min-width-input)]",
        fit: "min-w-0 w-fit",
        full: "min-w-0 w-full",
      },
    },
    defaultVariants: {
      size: "default",
      widthVariant: "enforced",
    },
  },
);
