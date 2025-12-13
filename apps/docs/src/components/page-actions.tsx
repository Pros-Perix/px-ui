import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Tooltip } from "@px-ui/core";
import { Button } from "@px-ui/core";

const cache = new Map<string, string>();

export function LLMCopyButton({
  /**
   * A URL to fetch the raw Markdown/MDX content of page
   */
  markdownUrl,
}: {
  markdownUrl: string;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const cached = cache.get(markdownUrl);
    if (cached) return navigator.clipboard.writeText(cached);

    setIsLoading(true);

    const res = await fetch(markdownUrl);

    if (!res.ok) {
      alert("Something went wrong, unable to copy");
      setIsLoading(false);
      return;
    }

    const data = await res.text();

    if (!data) {
      alert("Something went wrong, unable to copy");
      setIsLoading(false);
      return;
    }

    await navigator.clipboard.write([
      new ClipboardItem({
        "text/plain": data,
      }),
    ]);

    setIsLoading(false);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <Tooltip.Root>
      <Tooltip.Trigger
        render={
          <Button
            disabled={isLoading}
            variant="ghost"
            size="sm"
            className="w-fit"
            onClick={handleCopy}
            aria-label="Copy Markdown"
          >
            {copied ? <Check /> : <Copy size={16} />}
          </Button>
        }
      />
      <Tooltip.Content>Copy markdown content</Tooltip.Content>
    </Tooltip.Root>
  );
}
