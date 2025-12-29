import { useState } from "react";
import {
  ChatContainer,
  ChatInput,
  MessageList,
  TypingIndicator,
  type Message,
} from "@px-ui/ai";

const initialMessages: Message[] = [
  {
    id: "1",
    role: "assistant",
    content: "Hello! I'm an AI assistant. How can I help you today?",
  },
];

export function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (value: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: value,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    setIsLoading(true);
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `You said: "${value}". This is a demo response from the AI assistant.`,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <ChatContainer className="h-[400px]">
      <MessageList messages={messages} />
      {isLoading && (
        <div className="px-4 pb-2">
          <TypingIndicator />
        </div>
      )}
      <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
    </ChatContainer>
  );
}

