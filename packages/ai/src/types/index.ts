import type { ReactNode } from "react";

export type MessageRole = "user" | "assistant" | "system";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  createdAt?: Date;
  metadata?: Record<string, unknown>;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error?: Error | null;
}

export interface RenderMessageProps {
  message: Message;
  index: number;
}

export type RenderMessageFn = (props: RenderMessageProps) => ReactNode;

