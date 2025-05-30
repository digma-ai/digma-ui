import { useEffect, useRef, useState } from "react";

export const useAutoScroll = <T extends HTMLElement>() => {
  const elementRef = useRef<T | null>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const scrollHeightRef = useRef<number>(0);

  const scrollToBottom = () => {
    if (elementRef.current) {
      elementRef.current.scrollTop = elementRef.current.scrollHeight;
    }
  };

  const handleElementScroll = () => {
    const isAtBottom = () => {
      if (!elementRef.current) {
        return false;
      }
      const { scrollTop, scrollHeight, clientHeight } = elementRef.current;
      return scrollHeight - scrollTop <= clientHeight + 1; // Allow a small buffer for precision issues
    };

    if (!elementRef.current) {
      return;
    }

    setShouldAutoScroll(isAtBottom());
  };

  // Handle scroll height changes and auto-scroll
  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    const checkScrollHeight = () => {
      const currentScrollHeight = element.scrollHeight;

      // Only auto-scroll if height has grown and auto-scroll is enabled
      if (currentScrollHeight > scrollHeightRef.current && shouldAutoScroll) {
        scrollToBottom();
      }

      scrollHeightRef.current = currentScrollHeight;
    };

    const mutationObserver = new MutationObserver(() => {
      // Use RAF to ensure DOM is updated before measuring
      requestAnimationFrame(checkScrollHeight);
    });

    mutationObserver.observe(element, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true
    });

    // Initial setup
    scrollHeightRef.current = element.scrollHeight;
    scrollToBottom();

    return () => {
      mutationObserver.disconnect();
    };
  }, [shouldAutoScroll]);

  return {
    elementRef,
    shouldAutoScroll,
    handleElementScroll,
    scrollToBottom
  };
};
