import * as React from "react";

import { cn } from "../utils";

interface TextareaProps extends Omit<React.ComponentProps<"textarea">, "size"> {
  size?: "default" | "sm";
  invalid?: boolean;
}

function Textarea({
  className,
  size = "default",
  invalid,
  ...props
}: TextareaProps) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "min-w-0 font-medium placeholder:font-light shadow-xs flex w-full border-ppx-gray-5 bg-ppx-gray-1 text-ppx-sm text-ppx-gray-18 transition-[color,box-shadow] outline-none placeholder:text-ppx-sm placeholder:text-ppx-gray-18 focus:border-ppx-green-2 disabled:cursor-not-allowed disabled:border-ppx-gray-3 disabled:bg-ppx-gray-3 disabled:text-ppx-gray-11 disabled:placeholder:text-ppx-gray-11 aria-invalid:border-ppx-red-4 aria-invalid:bg-ppx-red-1 aria-invalid:ring-ppx-red-2",
        size === "sm" &&
          "min-h-12 p-2 rounded-ppx-s border-[0.046875rem] focus:ring focus:ring-ppx-green-2",
        size === "default" && "min-h-16 p-2 rounded-ppx-s border-2",
        className,
      )}
      aria-invalid={invalid}
      {...props}
    />
  );
}

export { Textarea };
