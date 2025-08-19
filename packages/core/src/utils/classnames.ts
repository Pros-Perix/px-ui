import classnames, { ArgumentArray } from "classnames";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ArgumentArray) {
  return twMerge(classnames(inputs));
}
