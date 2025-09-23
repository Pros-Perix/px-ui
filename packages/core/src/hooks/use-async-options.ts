import { useState } from "react";
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

  const query = useInfiniteQuery({
    queryKey: params.cacheKey,
    queryFn: async ({ pageParam }) => {
      const { error, data } = await params.loadOptionsFn({
        search: search,
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
  });

  const items = query.data?.pages.flatMap((page) => page.options) ?? [];

  return {
    items,
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    isError: query.isError,
    open: isOpen,
    onOpenChange: setIsOpen,
    inputValue: search,
    onInputValueChange: setSearch,
    onLoadMore: query.fetchNextPage,
    _query: query,
  };
}
