import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "../lib/cn";
import { useCopyButton } from "fumadocs-ui/utils/use-copy-button";
import { buttonVariants } from "@px-ui/core";

const cache = new Map<string, string>();

export function LLMCopyButton({
  /**
   * A URL to fetch the raw Markdown/MDX content of page
   */
  markdownUrl,
}: {
  markdownUrl: string;
}) {
  const [isLoading, setLoading] = useState(false);
  const [checked, onClick] = useCopyButton(async () => {
    const cached = cache.get(markdownUrl);
    if (cached) return navigator.clipboard.writeText(cached);

    setLoading(true);

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/plain": fetch(markdownUrl).then(async (res) => {
            const content = await res.text();
            cache.set(markdownUrl, content);

            return content;
          }),
        }),
      ]);
    } finally {
      setLoading(false);
    }
  });

  return (
    <button
      disabled={isLoading}
      className={cn(
        buttonVariants({
          variant: "outline",
          size: "sm",
        }),
      )}
      onClick={onClick}
    >
      {checked ? <Check /> : <Copy />}
      Copy Markdown
    </button>
  );
}
