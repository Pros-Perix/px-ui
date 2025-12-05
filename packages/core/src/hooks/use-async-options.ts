import { useRef, useState } from "react";
import { useInfiniteQuery, type QueryKey } from "@tanstack/react-query";
import useDebounce from "./use-debounce";

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

export function useAsyncOptions<TData = any>(
  params: {
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
  },
  {
    isOpen,
    inputValue,
  }: {
    isOpen: boolean;
    inputValue: string;
  },
) {
  const [debouncedSearch, setDebouncedSearch] = useState(inputValue);
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

  if (inputValue === "" && debouncedSearch !== "" && isOpen) {
    setDebouncedSearch("");
  }

  useDebounce(
    () => {
      setDebouncedSearch(inputValue);
    },
    300,
    [inputValue],
  );

  const items = query.data?.pages.flatMap((page) => page.options) ?? [];

  const handleLoadMore = () => {
    query.fetchNextPage();
  };

  return {
    items,
    isLoading: query.isLoading,
    isLoadingMore: query.isFetchingNextPage,
    hasMore: query.hasNextPage,
    isError: query.isError,
    onLoadMore: handleLoadMore,
    _query: query,
  };
}

export type LoadOptionsConfig<TData> = {
  cacheKey: QueryKey;
  loader: LoadOptionsFn<TData>;
};

export function defineLoadOptions<TData = any>(
  loadOptions: LoadOptionsConfig<TData>,
) {
  return loadOptions;
}

export type InferOption<T> =
  T extends LoadOptionsConfig<infer TData> ? TData : never;
export type InferOptions<T> =
  T extends LoadOptionsConfig<infer TData> ? TData[] : never;
