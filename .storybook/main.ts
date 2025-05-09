import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";

const config: StorybookConfig = {
  framework: {
    name: path.dirname(require.resolve("@storybook/react-vite/package.json")),
    options: {},
  },
  stories: ["../packages/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  core: {
    builder: {
      name: path.dirname(
        require.resolve("@storybook/builder-vite/package.json"),
      ),
      options: {},
    },
  },
};

export default config;
