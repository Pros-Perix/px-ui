import { createFileRoute, notFound } from '@tanstack/react-router';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { createServerFn } from '@tanstack/react-start';
import { source } from '@/lib/source';
import browserCollections from 'fumadocs-mdx:collections/browser';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import { baseOptions } from '@/lib/layout.shared';
import { useFumadocsLoader } from 'fumadocs-core/source/client';

// Preview components
import { Preview, PreviewStack } from '@/components/preview';

// PX-UI Components for live previews
import {
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
  buttonVariants,
} from '@px-ui/core';
import * as Dialog from '@px-ui/core/dialog';
import * as Select from '@px-ui/core/select';
import * as Popover from '@px-ui/core/popover';
import * as Tooltip from '@px-ui/core/tooltip';
import * as Tabs from '@px-ui/core/tabs';
import * as Menu from '@px-ui/core/menu';
import * as Progress from '@px-ui/core/progress';
import * as RadioGroup from '@px-ui/core/radio-group';
import * as Combobox from '@px-ui/core/combobox';
import * as Breadcrumbs from '@px-ui/core/breadcrumbs';
import * as InputGroup from '@px-ui/core/input-group';
import * as SegmentedControl from '@px-ui/core/segmented-control';
import * as BlockCheckboxGroup from '@px-ui/core/block-checkbox-group';
import * as BlockRadioGroup from '@px-ui/core/block-radio-group';

export const Route = createFileRoute('/docs/$')({
  component: Page,
  loader: async ({ params }) => {
    const slugs = params._splat?.split('/') ?? [];
    const data = await serverLoader({ data: slugs });
    await clientLoader.preload(data.path);
    return data;
  },
});

const serverLoader = createServerFn({
  method: 'GET',
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
