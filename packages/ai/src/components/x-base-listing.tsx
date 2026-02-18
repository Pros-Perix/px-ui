const MAX_ITEMS = 8;

export interface XBaseListingProps<T> {
  title: string;
  count?: number;
  items: T[];
  /** Optional slot for header actions (e.g. View All link). Renders in the header next to the title. */
  actions?: React.ReactNode;
  isLoading?: boolean;
  emptyState?: React.ReactNode;
  children: (item: T) => React.ReactNode;
}

export function XBaseListing<T>({
  title,
  count,
  items,
  actions,
  isLoading = false,
  emptyState,
  children,
}: XBaseListingProps<T>) {
  const displayItems = items.slice(0, MAX_ITEMS);

  if (isLoading) {
    return (
      <div className="flex w-full min-w-0 flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="h-6 w-32 animate-pulse rounded bg-ppx-neutral-4" />
          <div className="h-8 w-20 animate-pulse rounded bg-ppx-neutral-4" />
        </div>
        <div className="grid grid-cols-2 gap-3 py-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 rounded-lg bg-ppx-neutral-3" />
          ))}
        </div>
      </div>
    );
  }

  if (displayItems.length === 0) {
    return (
      <div className="flex w-full min-w-0 flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-ppx-sm font-semibold text-ppx-foreground">{title}</h3>
        </div>
        <div className="rounded-lg border border-ppx-neutral-5 bg-ppx-neutral-2 px-4 py-8 text-center text-ppx-sm text-ppx-neutral-10">
          {emptyState ?? `No ${title.toLowerCase()} found`}
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-3">
      <header className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <h3 className="text-ppx-sm font-semibold text-ppx-foreground">{title}</h3>
          {count != null && (
            <p className="text-ppx-xs text-ppx-neutral-10">
              {count} result{count !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        {actions}
      </header>

      <div className="grid grid-cols-2 gap-3 py-2">
        {displayItems.map((item, index) => (
          <div
            key={index}
            className="rounded-lg border border-ppx-neutral-5 bg-ppx-neutral-1 p-3"
          >
            {children(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
