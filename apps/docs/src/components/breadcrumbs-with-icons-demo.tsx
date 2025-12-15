import { Breadcrumbs } from "@px-ui/core";

export function BreadcrumbsWithIconsDemo() {
  return (
    <Breadcrumbs.Breadcrumb>
      <Breadcrumbs.BreadcrumbList>
        <Breadcrumbs.BreadcrumbItem>
          <Breadcrumbs.BreadcrumbLink href="/" className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Home
          </Breadcrumbs.BreadcrumbLink>
        </Breadcrumbs.BreadcrumbItem>
        <Breadcrumbs.BreadcrumbSeparator />
        <Breadcrumbs.BreadcrumbItem>
          <Breadcrumbs.BreadcrumbLink href="/products" className="flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Products
          </Breadcrumbs.BreadcrumbLink>
        </Breadcrumbs.BreadcrumbItem>
        <Breadcrumbs.BreadcrumbSeparator />
        <Breadcrumbs.BreadcrumbItem>
          <Breadcrumbs.BreadcrumbPage className="flex items-center gap-1.5">
            Laptops
          </Breadcrumbs.BreadcrumbPage>
        </Breadcrumbs.BreadcrumbItem>
      </Breadcrumbs.BreadcrumbList>
    </Breadcrumbs.Breadcrumb>
  );
}
