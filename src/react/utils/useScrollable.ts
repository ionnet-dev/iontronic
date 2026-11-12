import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Tracks whether an element's content overflows it, so a scroll container can be made keyboard focusable only when
 * there is something to scroll.
 *
 * @returns A ref for the scroll container and whether it currently overflows.
 */
export function useScrollable<T extends HTMLElement>(): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [scrollable, setScrollable] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const check = () => setScrollable(element.scrollHeight > element.clientHeight + 1 || element.scrollWidth > element.clientWidth + 1);
    check();
    const observer = new ResizeObserver(check);
    observer.observe(element);
    for (const child of Array.from(element.children)) observer.observe(child);
    return () => observer.disconnect();
  }, []);
  return [ref, scrollable];
}

export default useScrollable;
