import { createFileRoute, notFound } from "@tanstack/react-router";
import { source } from "@/lib/source";

export const Route = createFileRoute("/llms/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const slugs = params._splat?.split("/")?.slice(1) ?? [];

        if (slugs.at(-1)?.endsWith(".md")) {
          slugs[slugs.length - 1] = slugs.at(-1)!.replace(".md", "");
        }

        const page = source.getPage(slugs);

        if (!page) throw notFound();

        // TODO: we should get the raw mdx content,
        // but when using raw there are issues with CF workers.
        // this can work for now.
        const data = await page.data.getText("processed");

        return new Response(data, {
          headers: {
            "Content-Type": "text/markdown",
          },
        });
      },
    },
  },
});
