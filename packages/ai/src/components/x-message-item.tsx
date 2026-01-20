import type { Message } from "./xandi";

export interface XMessageItemProps {
  message: Message;
}

export function XMessageItem({ message }: XMessageItemProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {isUser ? (
        <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-ppx-green-5 px-4 py-2.5 text-white">
          <p className="text-ppx-sm leading-relaxed">{message.content}</p>
        </div>
      ) : (
        <div className="max-w-[80%]">
          <p className="text-ppx-sm leading-relaxed text-ppx-neutral-13">{message.content}</p>
        </div>
      )}
    </div>
  );
}
