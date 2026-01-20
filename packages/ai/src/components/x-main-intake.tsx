import { useState } from "react";

import { Button, FileIcon, SendIcon, StopIcon } from "@px-ui/core";

export interface Suggestion {
  id: string;
  label: string;
  prompt: string;
}

export interface XMainIntakeProps {
  isLoading?: boolean;
  onSend: (message: string) => void;
  placeholder?: string;
  suggestions?: Suggestion[];
}

export function XMainIntake({ 
  isLoading, 
  onSend, 
  placeholder = "Ask about jobs, candidates, timesheets, or anything workforce...",
  suggestions = [],
}: XMainIntakeProps) {
  const [input, setInput] = useState("");

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput("");
    }
  };

  const handleSuggestionClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 rounded-2xl border border-ppx-neutral-5 bg-ppx-neutral-1 p-3">
        <div className="uploads-section"></div>

        <XIntakeTextarea
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          placeholder={placeholder}
          disabled={isLoading}
        />

        <div className="actions-section flex flex-row items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            disabled={isLoading}
          >
            <FileIcon width={20} />
          </Button>
          <span className="ml-auto text-ppx-xs text-ppx-neutral-10">
            Enter to send · Shift+Enter for new line
          </span>
          <Button
            type="submit"
            size="icon-sm"
            disabled={isLoading || !input.trim()}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-ppx-green-5 text-white transition-all hover:bg-ppx-green-4 hover:shadow-[0_0_12px_rgba(40,182,116,0.6)] disabled:bg-ppx-neutral-5 disabled:text-ppx-neutral-10 disabled:shadow-none"
          >
            {isLoading ? (
              <StopIcon width={14} />
            ) : (
              <SendIcon width={16} />
            )}
          </Button>
        </div>
      </form>

      {suggestions.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {suggestions.map((suggestion, index) => (
            <Button
              key={suggestion.id}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleSuggestionClick(suggestion.prompt)}
              className="animate-[popUp_0.3s_ease-out_forwards] rounded-full opacity-0"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {suggestion.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}


/////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////Supporting Components//////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////

interface XIntakeTextareaProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
}

function XIntakeTextarea({ value, onChange, onSubmit, placeholder, disabled }: XIntakeTextareaProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
    // Shift+Enter allows default behavior (newline)
  };

  return (
    <textarea
      className="w-full resize-none border-none bg-transparent outline-none"
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
}
