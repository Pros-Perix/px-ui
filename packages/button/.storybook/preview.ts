import "../../../packages/core/dist/core.css";
import * as rootPreview from "../../../.storybook/preview";
import type { Preview } from "@storybook/react";

export const parameters: Preview["parameters"] = {
  ...rootPreview.parameters,
  layout: "centered", // Optional: override or extend root config
};

export const decorators = [...(rootPreview.decorators || [])];
