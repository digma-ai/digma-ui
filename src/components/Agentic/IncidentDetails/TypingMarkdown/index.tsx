import { memo, useEffect, useState } from "react";
import { isNumber } from "../../../../typeGuards/isNumber";
import { MarkdownRenderer } from "../MarkdownRenderer";
import type { TypingMarkdownProps } from "./types";

export const TypingMarkdownComponent = ({
  text,
  onComplete,
  speed
}: TypingMarkdownProps) => {
  const isAnimated = isNumber(speed);
  const [displayedText, setDisplayedText] = useState(isAnimated ? "" : text);
  const [currentIndex, setCurrentIndex] = useState(
    isAnimated ? 0 : text.length
  );
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isAnimated && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentIndex >= text.length && !isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [isAnimated, currentIndex, text, speed, onComplete, isComplete]);

  return <MarkdownRenderer text={displayedText} />;
};

export const TypingMarkdown = memo(TypingMarkdownComponent);
