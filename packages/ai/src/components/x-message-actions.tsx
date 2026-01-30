import { useState } from "react";
import { Button, Dialog, toast, Tooltip } from "@px-ui/core";

import {
  CheckIcon,
  CopyIcon,
  DebugIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "../assets/icons";
import { useXandi, type FeedbackType } from "../context/xandi-context";

export type { FeedbackType } from "../context/xandi-context";

// ============================================================================
// Root
// ============================================================================

/**
 * Container for message actions. Use with composable children:
 * - XMessageActions.Feedback
 * - XMessageActions.Copy
 * - XMessageActions.Debug
 */
export function Root({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-1">{children}</div>;
}

// ============================================================================
// Feedback
// ============================================================================

export interface FeedbackProps {
  messageId: string;
}

export function Feedback({ messageId }: FeedbackProps) {
  const { submitFeedback } = useXandi();
  const [feedback, setFeedback] = useState<FeedbackType>(null);

  const handleFeedback = (type: FeedbackType) => {
    const newFeedback = feedback === type ? null : type;
    setFeedback(newFeedback);
    submitFeedback(messageId, newFeedback);
  };

  return (
    <>
      {/* Thumbs Up */}
      <Tooltip.Root>
        <Tooltip.Trigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => handleFeedback("up")}
              className={`h-7 w-7 ${
                feedback === "up"
                  ? "bg-ppx-green-2 text-ppx-green-5"
                  : "text-ppx-neutral-10 hover:text-ppx-neutral-12"
              }`}
            >
              <ThumbsUpIcon className={feedback === "up" ? "fill-current" : ""} />
            </Button>
          }
        />
        <Tooltip.Content>
          {feedback === "up" ? "You found this helpful" : "Good response"}
        </Tooltip.Content>
      </Tooltip.Root>

      {/* Thumbs Down */}
      <Tooltip.Root>
        <Tooltip.Trigger
          render={
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => handleFeedback("down")}
              className={`h-7 w-7 ${
                feedback === "down"
                  ? "bg-ppx-red-2 text-ppx-red-5"
                  : "text-ppx-neutral-10 hover:text-ppx-neutral-12"
              }`}
            >
              <ThumbsDownIcon className={feedback === "down" ? "fill-current" : ""} />
            </Button>
          }
        />
        <Tooltip.Content>
          {feedback === "down" ? "You found this unhelpful" : "Bad response"}
        </Tooltip.Content>
      </Tooltip.Root>
    </>
  );
}

// ============================================================================
// Copy
// ============================================================================

export interface CopyProps {
  content: string;
}

export function Copy({ content }: CopyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.add({
        title: "Copied!",
        description: "Message copied to clipboard",
        type: "success",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.add({
        title: "Failed to copy",
        description: "Could not copy message to clipboard",
        type: "error",
      });
    }
  };

  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleCopy}
            className="h-7 w-7 text-ppx-neutral-10 hover:text-ppx-neutral-12"
          >
            {copied ? (
              <CheckIcon className="text-ppx-green-5" />
            ) : (
              <CopyIcon />
            )}
          </Button>
        }
      />
      <Tooltip.Content>
        {copied ? "Copied!" : "Copy message"}
      </Tooltip.Content>
    </Tooltip.Root>
  );
}

// ============================================================================
// Debug
// ============================================================================

export interface DebugProps {
  messageId: string;
  debugTrace: unknown;
}

export function Debug({ messageId, debugTrace }: DebugProps) {
  const [debugOpen, setDebugOpen] = useState(false);

  return (
    <Dialog.Root open={debugOpen} onOpenChange={setDebugOpen}>
      <Tooltip.Root>
        <Tooltip.Trigger
          render={
            <Dialog.Trigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="h-7 w-7 text-ppx-neutral-10 hover:text-ppx-neutral-12"
                >
                  <DebugIcon />
                </Button>
              }
            />
          }
        />
        <Tooltip.Content>
          View debug trace
        </Tooltip.Content>
      </Tooltip.Root>

      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="max-w-2xl">
          <Dialog.Header>
            <Dialog.Title>Debug Trace</Dialog.Title>
            <Dialog.Description>
              Response debug information for message {messageId}
            </Dialog.Description>
          </Dialog.Header>
          <div className="max-h-96 overflow-auto rounded bg-ppx-neutral-2 p-4">
            <pre className="whitespace-pre-wrap font-mono text-ppx-xs text-ppx-neutral-12">
              {JSON.stringify(debugTrace, null, 2)}
            </pre>
          </div>
          <Dialog.Footer>
            <Dialog.Close render={<Button variant="outline">Close</Button>} />
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
