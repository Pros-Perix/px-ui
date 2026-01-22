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

export interface XandiResponse {
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

    // #region agent log
    console.log('[DEBUG H6] sendMessage called:', {text,isLoading});
    fetch('http://127.0.0.1:7243/ingest/f64c9612-7108-4b37-8233-ace78f032f24',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'xandi-context.tsx:57',message:'sendMessage called',data:{text,isLoading},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H6'})}).catch(()=>{});
    // #endregion

    // Add user message
    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // #region agent log
      console.log('[DEBUG H6] calling fetchResponse:', {text});
      fetch('http://127.0.0.1:7243/ingest/f64c9612-7108-4b37-8233-ace78f032f24',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'xandi-context.tsx:71',message:'calling fetchResponse',data:{text},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H6'})}).catch(()=>{});
      // #endregion
      const response = await fetchResponse(text);

      // #region agent log
      console.log('[DEBUG H6] fetchResponse returned:', {content:response.content,contentLength:response.content?.length,type:response.type});
      fetch('http://127.0.0.1:7243/ingest/f64c9612-7108-4b37-8233-ace78f032f24',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'xandi-context.tsx:77',message:'fetchResponse returned',data:{content:response.content,contentLength:response.content?.length,type:response.type},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H6'})}).catch(()=>{});
      // #endregion

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: response.content,
        type: response.type,
        debugTrace: response.debugTrace,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      // #region agent log
      console.log('[DEBUG H6] fetchResponse error:', {error:String(error)});
      fetch('http://127.0.0.1:7243/ingest/f64c9612-7108-4b37-8233-ace78f032f24',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'xandi-context.tsx:91',message:'fetchResponse error',data:{error:String(error)},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H6'})}).catch(()=>{});
      // #endregion
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
