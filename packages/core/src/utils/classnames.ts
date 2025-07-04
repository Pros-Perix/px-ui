import classnames, { ArgumentArray } from "classnames";

export function cn(...inputs: ArgumentArray) {
  return classnames(inputs);
}
