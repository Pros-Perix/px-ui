import { createContext, useContext, useEffect, useRef, useState } from "react";

import { XANDI_AVATAR_URL } from "../constants";

// ============================================================================
// Types
// ============================================================================

export type MessageType = "text" | "markdown";
export type FeedbackType = "up" | "down" | null;

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: MessageType;
  debugTrace?: unknown;
}

/** API response structure from the backend */
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

/** Transformed response for internal use */
export interface XandiResponse {
  content: string;
  type?: MessageType;
  debugTrace?: unknown;
  conversationId?: string;
}

/** Conversation summary for history list */
export interface ConversationSummary {
  id: string;
  title: string;
  timestamp: Date;
}

/** Full conversation with messages */
export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================================
// Config
// ============================================================================

export interface XandiConfig {
  /** URL for the assistant's avatar image */
  avatarUrl?: string;
  /** Name of the assistant (default: "Xandi") */
  assistantName?: string;
}

const defaultConfig: Required<XandiConfig> = {
  avatarUrl: XANDI_AVATAR_URL,
  assistantName: "Xandi",
};

// ============================================================================
// Handlers
// ============================================================================

export interface FetchRespOptions {
  conversationId?: string;
  signal?: AbortSignal;
}

export interface XandiHandlers {
  /** Fetch AI response for a message */
  fetchResp: (message: string, options?: FetchRespOptions) => Promise<XandiResponse>;
  /** Get a conversation by ID (for restoring sessions) */
  getConv?: (conversationId: string) => Promise<Conversation>;
  /** Get conversation history list */
  getConvHistory?: () => Promise<ConversationSummary[]>;
  /** Called when user provides feedback on a message */
  onFeedback?: (messageId: string, conversationId: string, feedback: FeedbackType) => void;
  /** Called when user stops the current request */
  onStop?: (conversationId: string) => void;
}

// ============================================================================
// Context
// ============================================================================

export interface XandiContextValue {
  messages: Message[];
  isLoading: boolean;
  conversationId: string | null;
  sendMessage: (text: string) => void;
  stopRequest: () => void;
  loadConversation: (conversationId: string) => Promise<void>;
  startNewConversation: () => void;
  submitFeedback: (messageId: string, feedback: FeedbackType) => void;
  config: Required<XandiConfig>;
}

const XandiContext = createContext<XandiContextValue | null>(null);

// ============================================================================
// Provider
// ============================================================================

export interface XandiProviderProps {
  /** All handler functions for API communication */
  handlers: XandiHandlers;
  /** Initial conversation ID to restore */
  conversationId?: string;
  /** Configuration for the assistant appearance */
  config?: XandiConfig;
  children: React.ReactNode;
}

export function XandiProvider({
  handlers,
  conversationId: initialConversationId,
  config: userConfig,
  children,
}: XandiProviderProps) {
  const [conversationId, setConversationId] = useState<string | null>(initialConversationId ?? null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Merge user config with defaults
  const config: Required<XandiConfig> = {
    ...defaultConfig,
    ...userConfig,
  };

  // Load initial conversation if ID is provided
  useEffect(() => {
    if (initialConversationId && handlers.getConv) {
      loadConversation(initialConversationId);
    }
  }, [initialConversationId]);

  const loadConversation = async (convId: string) => {
    if (!handlers.getConv) return;

    try {
      setIsLoading(true);
      const conversation = await handlers.getConv(convId);
      setConversationId(conversation.id);
      setMessages(conversation.messages);
    } catch (error) {
      console.error("Failed to load conversation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewConversation = () => {
    setConversationId(null);
    setMessages([]);
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Create abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      const response = await handlers.fetchResp(text, {
        conversationId: conversationId ?? undefined,
        signal: abortControllerRef.current.signal,
      });

      // Update conversation ID if returned from API
      if (response.conversationId) {
        setConversationId(response.conversationId);
      }

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.content,
        type: response.type,
        debugTrace: response.debugTrace,
      };
      setMessages((prev) => [...prev, assistantMessage]);
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
    if (conversationId && handlers.onStop) {
      handlers.onStop(conversationId);
    }
    setIsLoading(false);
  };

  const submitFeedback = (messageId: string, feedback: FeedbackType) => {
    if (handlers.onFeedback && conversationId) {
      handlers.onFeedback(messageId, conversationId, feedback);
    }
  };

  const value: XandiContextValue = {
    messages,
    isLoading,
    conversationId,
    sendMessage,
    stopRequest,
    loadConversation,
    startNewConversation,
    submitFeedback,
    config,
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
