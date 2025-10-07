import { useRef, useState } from "react";
import { useInfiniteQuery, QueryKey } from "@tanstack/react-query";

type LoadOptionsData<TData> = {
  options: TData[];
  hasMore: boolean;
};

type LoadOptionsReturn<TData> = {
  data: LoadOptionsData<TData>;
  error: any;
};

type LoadOptionsFn<TData> = (params: {
  search: string;
  page: number;
  signal: AbortSignal;
}) => Promise<LoadOptionsReturn<TData>>;

export function useAsyncOptions<TData = any>(params: {
  /**
   * An unique key to identify the cache, used to cache the results.
   * This must be unique
   *
   * @example
   * ```ts
   * const userOptions = defineAsyncOptions({
   *   cacheKey: ["users"],
   *   loader: async ({ page, search }) => {
   *     // Your async loading logic here
   *     return {
   *       data: { options: [], hasMore: false },
   *       error: null,
   *     };
   *   },
   * }),
   * const userOptions = useAsyncOptions(userOptions);
   * ```
   * });
   */
  cacheKey: QueryKey;
  loader: LoadOptionsFn<TData>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const isFetchedAfterMount = useRef(false);

  const query = useInfiniteQuery({
    queryKey: [...params.cacheKey, debouncedSearch],
    queryFn: async ({ pageParam, signal }) => {
      const { error, data } = await params.loader({
        search: debouncedSearch,
        page: pageParam,
        signal,
      });

      if (error) {
        throw new Error(error);
      }

      return data;
    },
    enabled: isOpen,
    initialPageParam: 1,
    staleTime: () => (isFetchedAfterMount.current ? Infinity : 0),
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
    retry: false,
  });

  if (query.isFetchedAfterMount && !isFetchedAfterMount.current) {
    isFetchedAfterMount.current = true;
  }

  const items = query.data?.pages.flatMap((page) => page.options) ?? [];

  const handleInputValueChange = (value: string) => {
    setSearch(value);

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    if (value === "") {
      setDebouncedSearch(value);
      timeout.current = null;
      return;
    }

    timeout.current = setTimeout(() => {
      setDebouncedSearch(value);
      timeout.current = null;
    }, 300);
  };

  const handleLoadMore = () => {
    query.fetchNextPage();
  };

  return {
    items,
    isLoading: query.isLoading,
    isLoadingMore: query.isFetchingNextPage,
    hasMore: query.hasNextPage,
    isError: query.isError,
    open: isOpen,
    onOpenChange: setIsOpen,
    inputValue: search,
    onInputValueChange: handleInputValueChange,
    onLoadMore: handleLoadMore,
    _query: query,
  };
}

export function defineAsyncOptions<TData = any>(options: {
  cacheKey: QueryKey;
  loader: LoadOptionsFn<TData>;
}) {
  return options;
}
