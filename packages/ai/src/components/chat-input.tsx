import * as React from "react";
import { cn, Button, Textarea } from "@px-ui/core";

export interface ChatInputProps extends Omit<React.ComponentProps<"div">, "onSubmit"> {
  onSubmit?: (value: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

function ChatInput({
  className,
  onSubmit,
  isLoading = false,
  placeholder = "Type a message...",
  disabled = false,
  ...props
}: ChatInputProps) {
  const [value, setValue] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmedValue = value.trim();
    if (trimmedValue && !isLoading && !disabled) {
      onSubmit?.(trimmedValue);
      setValue("");
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      data-slot="chat-input"
      className={cn(
        "flex items-end gap-2 border-t border-ppx-neutral-5 bg-ppx-neutral-1 p-4",
        className,
      )}
      {...props}
    >
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        className="min-h-10 max-h-32 resize-none"
        rows={1}
      />
      <Button
        onClick={handleSubmit}
        disabled={!value.trim() || isLoading || disabled}
        variant="primary"
        size="icon"
        aria-label="Send message"
      >
        {isLoading ? (
          <LoadingIcon className="size-5 animate-spin" />
        ) : (
          <SendIcon className="size-5" />
        )}
      </Button>
    </div>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 2L11 13" />
      <path d="M22 2L15 22L11 13L2 9L22 2Z" />
    </svg>
  );
}

function LoadingIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

export { ChatInput };

