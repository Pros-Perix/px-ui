import { Breadcrumbs } from "@px-ui/core";

export function BreadcrumbsBasicDemo() {
  return (
    <Breadcrumbs.Breadcrumb>
      <Breadcrumbs.BreadcrumbList>
        <Breadcrumbs.BreadcrumbItem>
          <Breadcrumbs.BreadcrumbLink href="/">Home</Breadcrumbs.BreadcrumbLink>
        </Breadcrumbs.BreadcrumbItem>
        <Breadcrumbs.BreadcrumbSeparator />
        <Breadcrumbs.BreadcrumbItem>
          <Breadcrumbs.BreadcrumbLink href="/docs">
            Documentation
          </Breadcrumbs.BreadcrumbLink>
        </Breadcrumbs.BreadcrumbItem>
        <Breadcrumbs.BreadcrumbSeparator />
        <Breadcrumbs.BreadcrumbItem>
          <Breadcrumbs.BreadcrumbPage>Components</Breadcrumbs.BreadcrumbPage>
        </Breadcrumbs.BreadcrumbItem>
      </Breadcrumbs.BreadcrumbList>
    </Breadcrumbs.Breadcrumb>
  );
}
