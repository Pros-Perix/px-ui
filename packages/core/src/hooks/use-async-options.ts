import { useDeferredValue, useRef, useState } from "react";
import { useInfiniteQuery, QueryKey } from "@tanstack/react-query";

type LoadOptionsData = {
  options: any[];
  hasMore: boolean;
};

type LoadOptionsReturn = {
  data: LoadOptionsData;
  error: any;
};

export type LoadOptionsFn = (params: {
  search: string;
  page: number;
}) => Promise<LoadOptionsReturn>;

export function useAsyncOptions(params: {
  /**
   * An unique key to identify the cache, used to cache the results.
   * This must be unique
   *
   * @example
   * const query = useAsyncOptions({
   *   cacheKey: ["organizations"],
   *   loadOptionsFn: async ({ search, page }) => {
   *     return {
   *       data: { options: [], hasMore: false },
   *       error: null,
   *     };
   *   },
   * });
   */
  cacheKey: QueryKey;
  loadOptionsFn: LoadOptionsFn;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const deferredSearch = useDeferredValue(search);

  const query = useInfiniteQuery({
    queryKey: [...params.cacheKey, deferredSearch],
    queryFn: async ({ pageParam }) => {
      const { error, data } = await params.loadOptionsFn({
        search: debouncedSearch,
        page: pageParam,
      });

      if (error) {
        throw new Error(error);
      }

      return data;
    },
    enabled: isOpen,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore ? allPages.length + 1 : undefined,
    retry: false,
    staleTime: Infinity,
  });

  const items = query.data?.pages.flatMap((page) => page.options) ?? [];

  const handleSearchChange = (value: string) => {
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

  return {
    items,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    isError: query.isError,
    open: isOpen,
    onOpenChange: setIsOpen,
    inputValue: search,
    onInputValueChange: handleSearchChange,
    onLoadMore: query.fetchNextPage,
    _query: query,
  };
}
