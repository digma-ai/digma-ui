import { useEffect, useRef, useState } from "react";
import type { CursorFollowerProps } from "./types";

const MAX_ROTATION_DEGREE = 40;
const PERSPECTIVE = 100;
const COEFFICIENT = 10;

export const CursorFollower = ({ children }: CursorFollowerProps) => {
  const [degree, setDegree] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleMouseMove = (event: MouseEvent) => {
    if (ref.current) {
      const elPosition = ref.current.getBoundingClientRect();
      const diffX = event.pageX - elPosition.left - elPosition.width / 2;
      const degree = Math.min(
        Math.abs(diffX / COEFFICIENT),
        MAX_ROTATION_DEGREE
      );

      if (diffX > 0) {
        setDegree(degree);
      }

      if (diffX < 0) {
        setDegree(-degree);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return (
    <div style={{ perspective: PERSPECTIVE }}>
      <div style={{ transform: `rotateY(${degree}deg)` }} ref={ref}>
        {children}
      </div>
    </div>
  );
};
