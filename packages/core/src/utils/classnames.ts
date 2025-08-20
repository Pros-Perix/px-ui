import classnames, { ArgumentArray } from "classnames";
import { extendTailwindMerge } from "tailwind-merge";

// Create a custom tailwind-merge instance that knows about our custom utilities
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        // Add our custom text-ppx-* utilities to the font-size group instead of text-color
        {
          text: [
            "ppx-h1",
            "ppx-h2",
            "ppx-h3",
            "ppx-h4",
            "ppx-base",
            "ppx-sm",
            "ppx-xs",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ArgumentArray) {
  return customTwMerge(classnames(inputs));
}
