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
  id: string | null;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

/** Creates a new empty conversation */
function createEmptyConversation(): Conversation {
  return {
    id: null,
    title: "New Chat",
    messages: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
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
  /** Current conversation with messages */
  conversation: Conversation;
  /** Whether a request is in progress */
  isLoading: boolean;
  /** Send a message to the assistant */
  sendMessage: (text: string) => void;
  /** Stop the current request */
  stopRequest: () => void;
  /** Load an existing conversation by ID */
  loadConversation: (conversationId: string) => Promise<void>;
  /** Start a new empty conversation */
  startNewConversation: () => void;
  /** Submit feedback for a message */
  submitFeedback: (messageId: string, feedback: FeedbackType) => void;
  /** Configuration for the assistant */
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
  const [conversation, setConversation] = useState<Conversation>(createEmptyConversation);
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
      const loadedConversation = await handlers.getConv(convId);
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

    // Add user message
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

    // Create abort controller for this request
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
