import "./index.css";

export {
  XandiProvider,
  useXandi,
  type Message,
  type MessageType,
  type FeedbackType,
  type XandiResponse,
  type XandiApiResponse,
  type XandiConfig,
  type XandiUIMode,
  type XandiHandlers,
  type FetchRespOptions,
  type GetConvOptions,
  type Conversation,
  type ConversationSummary,
} from "./context/xandi-context";
export type { XandiProviderProps, XandiContextValue } from "./context/xandi-context";

export { Xandi, type XandiProps } from "./components/xandi";
export { XHeader, type XHeaderProps } from "./components/x-header";
export { XSidebar, type XSidebarProps } from "./components/x-sidebar";
export { XChatHistory, type XChatHistoryProps, type ChatHistoryItem } from "./components/x-chat-history";
export * as XMessageActions from "./components/x-message-actions";
export { type Suggestion } from "./components/x-main-intake";
