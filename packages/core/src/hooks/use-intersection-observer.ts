import React from "react";

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | Document | null;
  rootMargin?: string;
}

export type UseIntersectionObserverReturn = [
  (node: Element | null) => void,
  IntersectionObserverEntry | null,
];

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {},
): UseIntersectionObserverReturn {
  const { threshold = 1, root = null, rootMargin = "0px" } = options;
  const [entry, setEntry] = React.useState<IntersectionObserverEntry | null>(
    null,
  );

  const previousObserver = React.useRef<IntersectionObserver | null>(null);

  const customRef = React.useCallback(
    (node: Element | null) => {
      if (previousObserver.current) {
        previousObserver.current.disconnect();
        previousObserver.current = null;
      }

      if (node?.nodeType === Node.ELEMENT_NODE) {
        const observer = new IntersectionObserver(
          ([entry]: IntersectionObserverEntry[]) => {
            setEntry(entry ?? null);
          },
          { threshold, root, rootMargin },
        );

        observer.observe(node);
        previousObserver.current = observer;
      }
    },
    [threshold, root, rootMargin],
  );

  return [customRef, entry] as const;
}
