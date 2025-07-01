import React from "react";
import { twMerge } from "tailwind-merge";
import { ButtonBase } from "./ButtonBase";

type PrimaryButtonProps = React.ComponentProps<typeof ButtonBase>;

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  className,
  ...props
}) => {
  return (
    <ButtonBase
      className={twMerge(
        "bg-gray-900 hover:bg-gray-700 text-white px-4 py-2 rounded-md active:bg-gray-800",
        className
      )}
      {...props}
    />
  );
};
