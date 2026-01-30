import type { Message, MessageType } from "../context/xandi-context";
import { MarkdownRenderer } from "./renderers/markdown-renderer";
import { TextRenderer } from "./renderers/text-renderer";

export interface XMessageItemProps {
  message: Message;
}

export function XMessageItem({ message }: XMessageItemProps) {
  const isUser = message.role === "user";
  const messageType: MessageType = message.type ?? "markdown";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {isUser ? (
        <div className="max-w-[90%] rounded-2xl rounded-br-sm bg-ppx-green-5 px-4 py-2.5">
          <MessageRenderer type={messageType} message={message} />
        </div>
      ) : (
        <div className="max-w-[90%]">
          <MessageRenderer type={messageType} message={message} />
        </div>
      )}
    </div>
  );
}

interface MessageRendererProps {
  type: MessageType;
  message: Message;
}

function MessageRenderer({ type, message }: MessageRendererProps) {
  switch (type) {
    case "text":
      return <TextRenderer message={message} />;
    case "markdown":
    default:
      return <MarkdownRenderer message={message} />;
  }
}
