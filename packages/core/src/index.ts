// We need to export all the
import "./index.css";

// Components with namespace conflicts - export as namespaces
export * as Dialog from "./components/dialog";
export * as Popover from "./components/popover";
export * as Combobox from "./components/combobox";
export * as Select from "./components/select";
export * as Menu from "./components/menu";
export * as InputGroup from "./components/input-group";
export * as SegmentedControl from "./components/segmented-control";
export * as Tabs from "./components/tabs";
export * as Tooltip from "./components/tooltip";
export * as BlockCheckboxGroup from "./components/block-checkbox-group";
export * as BlockRadioGroup from "./components/block-radio-group";

// Simple components - export directly
export * from "./components/button";
export * from "./components/checkbox";
export * from "./components/label";
export * from "./components/text-input";
export * from "./components/input";
export * from "./components/textarea";
export * from "./components/avatar";
export * from "./components/avatar-group";
export * from "./components/spinner";
export * from "./components/switch";
export * from "./components/radio-group";

// Hooks
export * from "./hooks/use-debounce";
export * from "./hooks/use-async-options";
export * from "./hooks/use-infinite-scroll";
export * from "./hooks/use-intersection-observer";

// Utils
export * from "./utils";
