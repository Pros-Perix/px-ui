// This tells the bundler to include the CSS file on the build output
import "./index.css";

// Context and Provider
export { XandiProvider, useXandi, type Message } from "./context/xandi-context";
export type { XandiProviderProps } from "./context/xandi-context";

// Components
export { Xandi, type XandiProps } from "./components/xandi";
export { type Suggestion } from "./components/x-main-intake";
