import { createContext, useContext, useEffect, useState } from "react";

export type MessageType = "text" | "markdown" | "jobs";
export type FeedbackType = "up" | "down" | null;

// ============================================================================
// Data Types
// ============================================================================

export interface Job {
  id: string;
  title: string;
  status: string;
  office_country: string;
  office_city: string;
  created_at: string;
}

export interface Pagination {
  page: number;
  per_page: number;
  total: number;
}

export interface JobsData {
  jobs: Job[];
  pagination: Pagination;
}

// Union type for all possible data payloads
export type MessageData = JobsData | null;

// ============================================================================
// Message Types
// ============================================================================

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: MessageType;
  data?: MessageData;
  debugTrace?: unknown;
}

export interface XandiResponse {
  content: string;
  type?: MessageType;
  data?: MessageData;
  debugTrace?: unknown;
}

export interface XandiContextValue {
  messages: Message[];
  isLoading: boolean;
  sessionId: string | null;
  sendMessage: (text: string) => void;
  onFeedback?: (messageId: string, feedback: FeedbackType) => void;
}

const XandiContext = createContext<XandiContextValue | null>(null);

export interface XandiProviderProps {
  fetchResponse: (message: string) => Promise<XandiResponse>;
  sessionId?: string;
  onFeedback?: (messageId: string, feedback: FeedbackType) => void;
  children: React.ReactNode;
}

export function XandiProvider({
  fetchResponse,
  sessionId: initialSessionId,
  onFeedback,
  children,
}: XandiProviderProps) {
  const [sessionId, setSessionId] = useState<string | null>(initialSessionId ?? null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize sessionId if not provided
  useEffect(() => {
    if (!initialSessionId) {
      setSessionId(crypto.randomUUID());
    }
  }, [initialSessionId]);

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

    try {
      const response = await fetchResponse(text);

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.content,
        type: response.type,
        debugTrace: response.debugTrace,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const value: XandiContextValue = {
    messages,
    isLoading,
    sessionId,
    sendMessage,
    onFeedback,
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
