import { createContext, useContext, useEffect, useRef, useState } from "react";

import { XANDI_AVATAR_URL } from "../constants";

export type MessageType = "text" | "markdown";
export type FeedbackType = "up" | "down" | null;

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: MessageType;
  debugTrace?: unknown;
}

export interface XandiApiResponse {
  success: boolean;
  message: string;
  data: {
    intent: string;
    data: unknown;
    conversation_id: string;
  };
  trace?: {
    trace_id: string;
    execution_mode: string;
    intent: string;
    tool_id: string;
    debug_trace: unknown;
  };
}

export interface XandiResponse {
  content: string;
  type?: MessageType;
  debugTrace?: unknown;
  conversationId?: string;
}

export interface ConversationSummary {
  id: string;
  title: string;
  timestamp: Date;
}

export interface Conversation {
  id: string | null;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

function createEmptyConversation(): Conversation {
  return {
    id: null,
    title: "New Chat",
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export type XandiUIMode = "full" | "sidebar" | "floating";

export interface XandiConfig {
  avatarUrl?: string;
  assistantName?: string;
  uiMode?: XandiUIMode;
}

const defaultConfig: Required<XandiConfig> = {
  avatarUrl: XANDI_AVATAR_URL,
  assistantName: "Xandi",
  uiMode: "full",
};

export interface FetchRespOptions {
  conversationId?: string;
  signal?: AbortSignal;
}

export interface GetConvOptions {
  page?: number;
  perPage?: number;
}

const defaultGetConvOptions: Required<GetConvOptions> = {
  page: 1,
  perPage: 20,
};

export interface XandiHandlers {
  fetchResp: (message: string, options?: FetchRespOptions) => Promise<XandiResponse>;
  getConv?: (conversationId: string, options?: GetConvOptions) => Promise<Conversation>;
  getConvHistory?: () => Promise<ConversationSummary[]>;
  onFeedback?: (messageId: string, conversationId: string, feedback: FeedbackType) => void;
  onStop?: (conversationId: string) => void;
}

export interface XandiContextValue {
  conversation: Conversation;
  isLoading: boolean;
  sendMessage: (text: string) => void;
  stopRequest: () => void;
  loadConversation: (conversationId: string, options?: GetConvOptions) => Promise<void>;
  startNewConversation: () => void;
  submitFeedback: (messageId: string, feedback: FeedbackType) => void;
  getConvHistory?: () => Promise<ConversationSummary[]>;
  config: Required<XandiConfig>;
  setUiModeOverride: (mode: XandiUIMode | null) => void;
}

const XandiContext = createContext<XandiContextValue | null>(null);

export interface XandiProviderProps {
  handlers: XandiHandlers;
  conversationId?: string;
  config?: XandiConfig;
  children: React.ReactNode;
}

export function XandiProvider({
  handlers,
  conversationId: initialConversationId,
  config: userConfig,
  children,
}: XandiProviderProps) {
  const [conversation, setConversation] = useState<Conversation>(createEmptyConversation);
  const [isLoading, setIsLoading] = useState(false);
  const [uiModeOverride, setUiModeOverride] = useState<XandiUIMode | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const config: Required<XandiConfig> = {
    ...defaultConfig,
    ...userConfig,
    uiMode: uiModeOverride ?? userConfig?.uiMode ?? defaultConfig.uiMode,
  };

  useEffect(() => {
    if (initialConversationId && handlers.getConv) {
      loadConversation(initialConversationId);
    }
  }, [initialConversationId]);

  const loadConversation = async (convId: string, options?: GetConvOptions) => {
    if (!handlers.getConv) return;

    const opts = { ...defaultGetConvOptions, ...options };

    try {
      setIsLoading(true);
      const loadedConversation = await handlers.getConv(convId, opts);
      setConversation(loadedConversation);
    } catch (error) {
      console.error("Failed to load conversation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewConversation = () => {
    setConversation(createEmptyConversation());
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    setConversation((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      updatedAt: new Date(),
    }));
    setIsLoading(true);

    abortControllerRef.current = new AbortController();

    try {
      const response = await handlers.fetchResp(text, {
        conversationId: conversation.id ?? undefined,
        signal: abortControllerRef.current.signal,
      });

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.content,
        type: response.type,
        debugTrace: response.debugTrace,
      };

      setConversation((prev) => ({
        ...prev,
        id: response.conversationId ?? prev.id,
        messages: [...prev.messages, assistantMessage],
        updatedAt: new Date(),
      }));
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        console.error("Failed to send message:", error);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const stopRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    if (conversation.id && handlers.onStop) {
      handlers.onStop(conversation.id);
    }
    setIsLoading(false);
  };

  const submitFeedback = (messageId: string, feedback: FeedbackType) => {
    if (handlers.onFeedback && conversation.id) {
      handlers.onFeedback(messageId, conversation.id, feedback);
    }
  };

  const value: XandiContextValue = {
    conversation,
    isLoading,
    sendMessage,
    stopRequest,
    loadConversation,
    startNewConversation,
    submitFeedback,
    getConvHistory: handlers.getConvHistory,
    config,
    setUiModeOverride,
  };

  return <XandiContext.Provider value={value}>{children}</XandiContext.Provider>;
}

export function useXandi(): XandiContextValue {
  const context = useContext(XandiContext);
  if (!context) {
    throw new Error("useXandi must be used within XandiProvider");
  }
  return context;
}
