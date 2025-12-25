import { cn } from "../utils";

function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "text-ppx-sm peer-data-disabled:cursor-not-allowed peer-data-disabled:opacity-50 group-data-disabled:pointer-events-none group-data-disabled:opacity-50 flex select-none items-center gap-2 font-medium leading-none",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
