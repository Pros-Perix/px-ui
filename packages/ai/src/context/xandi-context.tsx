import { createContext, useContext, useEffect, useState } from "react";

export type MessageType = "text" | "markdown";
export type FeedbackType = "up" | "down" | null;

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  type?: MessageType;
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
  api: string;
  userId: string;
  orgId: string;
  sessionId?: string;
  onFeedback?: (messageId: string, feedback: FeedbackType) => void;
  children: React.ReactNode;
}

export function XandiProvider({
  api,
  userId,
  orgId,
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
      const response = await fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-org-id": orgId,
          "x-user-id": userId
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      if (data.success && data.response) {
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.response,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
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
