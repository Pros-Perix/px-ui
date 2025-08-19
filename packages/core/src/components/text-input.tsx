import * as React from "react";
import { cn } from "../utils";
import { Input as BaseInput } from "@base-ui-components/react";

interface InputProps
  extends Omit<React.ComponentProps<typeof BaseInput>, "size"> {
  size?: "default" | "sm";
  inputContainerClassName?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  invalid?: boolean;
}

export function TextInput({
  inputContainerClassName,
  className,
  type,
  leadingIcon,
  trailingIcon,
  size = "default",
  invalid,
  ...rest
}: InputProps) {
  return (
    <div
      className={cn("relative w-full", inputContainerClassName)}
      data-slot="input-container"
    >
      {leadingIcon && (
        <span
          data-slot="input-leading-icon"
          className="left-3 [&_svg:not([class*='size-'])]:size-4 absolute top-1/2 shrink-0 -translate-y-1/2 [&_svg]:shrink-0 [&_svg:not([class*='pointer-events-'])]:pointer-events-none"
        >
          {leadingIcon}
        </span>
      )}
      <BaseInput
        type={type}
        data-slot="input"
        className={cn(
          "min-w-0 font-medium placeholder:font-light shadow-xs flex w-full border-ppx-gray-5 bg-ppx-gray-1 text-ppx-sm text-ppx-gray-18 transition-[color,box-shadow] outline-none placeholder:text-ppx-sm placeholder:text-ppx-gray-18 focus:border-ppx-green-2 disabled:cursor-not-allowed disabled:border-ppx-gray-3 disabled:bg-ppx-gray-3 disabled:text-ppx-gray-11 disabled:placeholder:text-ppx-gray-11 aria-invalid:border-ppx-red-4 aria-invalid:bg-ppx-red-1 aria-invalid:ring-ppx-red-2",
          size === "sm" &&
            "h-8 p-2 rounded-ppx-s border-[0.046875rem] focus:ring focus:ring-ppx-green-2",
          size === "default" && "h-10 p-2 rounded-ppx-s border-2",
          leadingIcon ? "pl-10" : "",
          trailingIcon ? "pr-10" : "",
          type === "number" && "no-arrow-spin",
          className,
        )}
        aria-invalid={invalid}
        {...rest}
      />
      {trailingIcon && (
        <span
          data-slot="input-trailing-icon"
          className="right-3 [&_svg:not([class*='size-'])]:size-4 absolute top-1/2 shrink-0 -translate-y-1/2 [&_svg]:shrink-0 [&_svg:not([class*='pointer-events-'])]:pointer-events-none"
        >
          {trailingIcon}
        </span>
      )}
    </div>
  );
}
