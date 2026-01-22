import ReactMarkdown from "react-markdown";

import type { Message } from "../../context/xandi-context";
import * as XMessageActions from "../x-message-actions";

export interface MarkdownRendererProps {
  message: Message;
}

export function MarkdownRenderer({ message }: MarkdownRendererProps) {
  const isUser = message.role === "user";
  const baseClass = `text-ppx-sm leading-relaxed ${isUser ? "text-white" : "text-ppx-neutral-13"}`;
  const showActions = !isUser;

  return (
    <div>
      <div className={baseClass}>
        <ReactMarkdown
          components={{
            p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
            ul: ({ children }) => <ul className="mb-2 list-disc pl-4">{children}</ul>,
            ol: ({ children }) => <ol className="mb-2 list-decimal pl-4">{children}</ol>,
            li: ({ children }) => <li className="mb-1">{children}</li>,
            a: ({ href, children }) => (
              <a href={href} className="underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
      {showActions && (
        <div className="mt-2">
          <XMessageActions.Root>
            <XMessageActions.Feedback messageId={message.id} />
            <XMessageActions.Copy content={message.content} />
            {message.debugTrace != null && (
              <XMessageActions.Debug messageId={message.id} debugTrace={message.debugTrace} />
            )}
          </XMessageActions.Root>
        </div>
      )}
    </div>
  );
}
