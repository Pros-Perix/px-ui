import classnames, { type ArgumentArray } from "classnames";
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
      // Add custom height utilities
      h: [{ h: ["stretch-available", "input", "input-s"] }],
      // Add custom min-height utilities
      "min-h": [{ "min-h": ["input", "input-s"] }],
      // Add custom min-width utilities
      "min-w": [{ "min-w": ["input"] }],
      // Add custom padding utilities
      p: [{ p: ["input"] }],
      // Add custom border radius utilities
      rounded: [
        {
          rounded: [
            "ppx-xs",
            "ppx-s",
            "ppx-m",
            "ppx-l",
            "ppx-xl",
            "input",
            "input-s",
          ],
        },
      ],
      // Add custom font family utilities
      "font-family": [{ font: ["sans-light", "sans-sb", "sans-b"] }],
    },
  },
});

export function cn(...inputs: ArgumentArray) {
  return customTwMerge(classnames(inputs));
}
