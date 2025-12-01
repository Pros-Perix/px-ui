import rootConfig from "../../../.storybook/main";
import type { StorybookConfig } from "@storybook/react-vite";

// Extend root config with scoped story path
const config: StorybookConfig = {
  ...rootConfig,
  stories: ["./stories/*.@(ts|tsx)"],
};

export default config;
