import { useEffect, useEffectEvent } from "react";
import {
  useIntersectionObserver,
  type UseIntersectionObserverOptions,
} from "./use-intersection-observer";

const DEFAULT_DELAY_IN_MS = 100;

export type UseInfiniteScrollHookArgs = Pick<
  UseIntersectionObserverOptions,
  "rootMargin" | "threshold"
> & {
  isLoadingMore: boolean;
  // If the list has more items to load.
  hasMore: boolean;
  // The callback function to execute when the 'onLoadMore' is triggered.
  onLoadMore: () => unknown;
  // Flag to stop infinite scrolling. Can be used in case of an error etc too.
  disabled?: boolean;
};

function useInfiniteScroll({
  isLoadingMore,
  hasMore,
  onLoadMore,
  rootMargin,
  disabled,
  threshold = 0,
}: UseInfiniteScrollHookArgs) {
  const [ref, entry] = useIntersectionObserver({
    rootMargin,
    threshold,
  });
  const isVisible = Boolean(entry?.isIntersecting);

  const onLoadMoreEvent = useEffectEvent(() => {
    onLoadMore();
  });

  useEffect(() => {
    if (disabled) return;

    if (isVisible && hasMore && !isLoadingMore && !disabled) {
      // When we trigger 'onLoadMore' and new items are added to the list,
      // right before they become rendered on the screen, 'isLoadingMore' becomes false
      // and 'isVisible' can be true for a brief time, based on the scroll position.
      // So, it triggers 'onLoadMore' just after the first one is finished.
      // We use a small delay here to prevent this kind of situations.
      const timer = setTimeout(() => {
        onLoadMoreEvent();
      }, DEFAULT_DELAY_IN_MS);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isVisible, isLoadingMore, hasMore, disabled]);

  return [ref] as const;
}

export default useInfiniteScroll;
