import type { Message } from "../../context/xandi-context";
import * as XMessageActions from "../x-message-actions";

export interface TextRendererProps {
  message: Message;
}

export function TextRenderer({ message }: TextRendererProps) {
  const isUser = message.role === "user";
  const showActions = !isUser;
  const contentIsString = typeof message.content === "string";

  return (
    <div>
      <p className={`text-ppx-sm leading-relaxed ${isUser ? "text-white" : "text-ppx-neutral-13"}`}>
        {message.content}
      </p>
      {showActions && (
        <div className="mt-2">
          <XMessageActions.Root>
            <XMessageActions.Feedback messageId={message.id} />
            {contentIsString && <XMessageActions.Copy content={message.content} />}
            {message.debugTrace != null && (
              <XMessageActions.Debug messageId={message.id} debugTrace={message.debugTrace} />
            )}
          </XMessageActions.Root>
        </div>
      )}
    </div>
  );
}
