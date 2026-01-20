import { useState } from "react";

import { XMainIntake, type Suggestion } from "./x-main-intake";
import { XMessageContainer } from "./x-message-container";
import { XWelcome } from "./x-welcome";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface XandiProps {
  api?: string;
  headers?: Record<string, string>;
  welcomeMessage?: string;
  suggestions?: Suggestion[];
}

export function Xandi({
  api = "http://localhost:3001/query",
  headers = {
    "x-org-id": "e37723a6-4363-4831-86e0-5e4950ed15ec",
    "x-user-id": "0108e28d-ec3b-4648-9178-b4a2c0d582ba",
  },
  welcomeMessage = "How can I help you today?",
  suggestions = [],
}: XandiProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
          ...headers,
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

  const isEmpty = messages.length === 0;

  return (
    <div className="flex flex-col">
      {isEmpty ? (
        <XWelcome message={welcomeMessage} />
      ) : (
        <XMessageContainer messages={messages} />
      )}
      <XMainIntake 
        isLoading={isLoading} 
        onSend={sendMessage} 
        suggestions={isEmpty ? suggestions : []}
      />
    </div>
  );
}
