// This tells the bundler to include the CSS file on the build output
import "./index.css";

// Components with namespace conflicts - export as namespaces
export * as Dialog from "./components/dialog";
export * as Popover from "./components/popover";
export * as Combobox from "./components/combobox";
export * as Select from "./components/select";
export * as Menu from "./components/menu";
export * as Progress from "./components/progress";
export * as InputGroup from "./components/input-group";
export * as SegmentedControl from "./components/segmented-control";
export * as Tabs from "./components/tabs";
export * as Tooltip from "./components/tooltip";
export * as BlockCheckboxGroup from "./components/block-checkbox-group";
export * as BlockRadioGroup from "./components/block-radio-group";
export * as Breadcrumbs from "./components/breadcrumbs";
export * as RadioGroup from "./components/radio-group";
export * as Collapsible from "./components/collapsible";
export { Calendar } from "./components/calendar";
export { PXUIProvider } from "./providers/px-ui-provider";
export { toast, anchoredToast } from "./components/toast";

// Simple components - export directly
export * from "./components/button";
export * from "./components/checkbox";
export * from "./components/label";
export * from "./components/input";
export * from "./components/textarea";
export * from "./components/avatar";
export * from "./components/avatar-group";
export * from "./components/spinner";
export * from "./components/switch";
export * from "./components/separator";
export * from "./components/date-picker";
export * from "./components/file-upload";
export * from "./components/otp-input";

// Re-export input-otp package components for composable usage
export * from "input-otp";

// Icons
export { default as FileIcon } from "./icons/file-icon";
export { default as UploadIcon } from "./icons/upload-icon";
export { default as ChevronDownIcon } from "./icons/chevron-down-icon";
export { default as SendIcon } from "./icons/send-icon";
export { default as StopIcon } from "./icons/stop-icon";
export { default as InfoIcon } from "./icons/info-icon";

// File type icons
export { default as PdfIcon } from "./icons/pdf-icon";
export { default as WordIcon } from "./icons/word-icon";
export { default as ExcelIcon } from "./icons/excel-icon";
export { default as ImageFileIcon } from "./icons/image-file-icon";
export { default as VideoIcon } from "./icons/video-icon";
export { default as AudioIcon } from "./icons/audio-icon";
export { default as ArchiveIcon } from "./icons/archive-icon";
export { default as CodeFileIcon } from "./icons/code-file-icon";
export { default as TextFileIcon } from "./icons/text-file-icon";
export { default as GenericFileIcon } from "./icons/generic-file-icon";
export { getFileTypeIcon } from "./icons/get-file-type-icon";

// Hooks
export * from "./hooks/use-debounce";
export * from "./hooks/use-file-upload";
export * from "./hooks/use-async-options";
export * from "./hooks/use-infinite-scroll";
export * from "./hooks/use-intersection-observer";
export * from "./hooks/use-mobile";

// Utils
export * from "./utils";
