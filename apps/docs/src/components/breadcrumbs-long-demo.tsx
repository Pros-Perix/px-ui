import { Breadcrumbs } from "@px-ui/core";

export function BreadcrumbsLongDemo() {
  return (
    <Breadcrumbs.Breadcrumb>
      <Breadcrumbs.BreadcrumbList>
        <Breadcrumbs.BreadcrumbItem>
          <Breadcrumbs.BreadcrumbLink href="/">Home</Breadcrumbs.BreadcrumbLink>
        </Breadcrumbs.BreadcrumbItem>
        <Breadcrumbs.BreadcrumbSeparator />
        <Breadcrumbs.BreadcrumbItem>
          <Breadcrumbs.BreadcrumbLink href="/products">
            Products
          </Breadcrumbs.BreadcrumbLink>
        </Breadcrumbs.BreadcrumbItem>
        <Breadcrumbs.BreadcrumbSeparator />
        <Breadcrumbs.BreadcrumbItem>
          <Breadcrumbs.BreadcrumbLink href="/products/electronics">
            Electronics
          </Breadcrumbs.BreadcrumbLink>
        </Breadcrumbs.BreadcrumbItem>
        <Breadcrumbs.BreadcrumbSeparator />
        <Breadcrumbs.BreadcrumbItem>
          <Breadcrumbs.BreadcrumbLink href="/products/electronics/computers">
            Computers
          </Breadcrumbs.BreadcrumbLink>
        </Breadcrumbs.BreadcrumbItem>
        <Breadcrumbs.BreadcrumbSeparator />
        <Breadcrumbs.BreadcrumbItem>
          <Breadcrumbs.BreadcrumbLink href="/products/electronics/computers/laptops">
            Laptops
          </Breadcrumbs.BreadcrumbLink>
        </Breadcrumbs.BreadcrumbItem>
        <Breadcrumbs.BreadcrumbSeparator />
        <Breadcrumbs.BreadcrumbItem>
          <Breadcrumbs.BreadcrumbPage>
            Gaming Laptops
          </Breadcrumbs.BreadcrumbPage>
        </Breadcrumbs.BreadcrumbItem>
      </Breadcrumbs.BreadcrumbList>
    </Breadcrumbs.Breadcrumb>
  );
}
