import { createFileRoute, notFound, useLocation } from "@tanstack/react-router";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { createServerFn } from "@tanstack/react-start";
import { source } from "@/lib/source";
import browserCollections from "fumadocs-mdx:collections/browser";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { baseOptions } from "@/lib/layout.shared";
import { useFumadocsLoader } from "fumadocs-core/source/client";

// Preview components
import { Preview, PreviewStack, CodeBlock } from "@/components/preview";

// PX-UI Components for live previews
import {
  // Simple components
  Button,
  Input,
  Textarea,
  Checkbox,
  Switch,
  Label,
  Spinner,
  Avatar,
  AvatarGroup,
  Separator,
  // Namespace components
  Dialog,
  Select,
  Popover,
  Tooltip,
  Tabs as PxTabs,
  Menu,
  Progress,
  Combobox,
  Breadcrumbs,
  InputGroup,
  SegmentedControl,
  BlockCheckboxGroup,
  BlockRadioGroup,
  // RadioGroup exports Group and Item
  Group as RadioGroupGroup,
  Item as RadioGroupItem,
} from "@px-ui/core";

// Create RadioGroup namespace for MDX
const RadioGroup = {
  Group: RadioGroupGroup,
  Item: RadioGroupItem,
};

export const Route = createFileRoute("/docs/$")({
  component: Page,
  loader: async ({ params }) => {
    const slugs = params._splat?.split("/") ?? [];
    const data = await serverLoader({ data: slugs });
    await clientLoader.preload(data.path);
    return data;
  },
});

const serverLoader = createServerFn({
  method: "GET",
})
  .inputValidator((slugs: string[]) => slugs)
  .handler(async ({ data: slugs }) => {
    const page = source.getPage(slugs);
    if (!page) throw notFound();

    return {
      path: page.path,
      pageTree: await source.serializePageTree(source.getPageTree()),
    };
  });

const clientLoader = browserCollections.docs.createClientLoader({
  component({ toc, frontmatter, default: MDX }) {
    return (
      <DocsPage toc={toc}>
        <DocsTitle>{frontmatter.title}</DocsTitle>
        <DocsDescription>{frontmatter.description}</DocsDescription>
        <DocsBody>
          <MDX
            components={{
              ...defaultMdxComponents,
              // Fumadocs Tabs for Preview/Code tabs
              Tab,
              Tabs,
              // Preview wrapper
              Preview,
              PreviewStack,
              CodeBlock,
              // PX-UI Components
              Button,
              Input,
              Textarea,
              Checkbox,
              Switch,
              Label,
              Spinner,
              Avatar,
              AvatarGroup,
              Separator,
              // @ts-expect-error
              Dialog,
              // @ts-expect-error
              Select,
              // @ts-expect-error
              Popover,
              // @ts-expect-error
              Tooltip,
              // @ts-expect-error
              PxTabs,
              // @ts-expect-error
              Menu,
              // @ts-expect-error
              Progress,
              // @ts-expect-error
              RadioGroup,
              // @ts-expect-error
              Combobox,
              // @ts-expect-error
              Breadcrumbs,
              // @ts-expect-error
              InputGroup,
              // @ts-expect-error
              SegmentedControl,
              // @ts-expect-error
              BlockCheckboxGroup,
              // @ts-expect-error
              BlockRadioGroup,
            }}
          />
        </DocsBody>
      </DocsPage>
    );
  },
});

function Page() {
  const data = Route.useLoaderData();
  const { pageTree } = useFumadocsLoader(data);
  const Content = clientLoader.getComponent(data.path);

  return (
    <DocsLayout {...baseOptions()} tree={pageTree}>
      <Content />
    </DocsLayout>
  );
}
