import { useEffect, useState } from "react";

interface ScrollbarDimensions {
  width: number;
  height: number;
}

export const useScrollbarDimensions = () => {
  const [dimensions, setDimensions] = useState<ScrollbarDimensions>({
    width: 0,
    height: 0
  });

  useEffect(() => {
    const calculateDimensions = (): ScrollbarDimensions => {
      const verticalContainer = document.createElement("div");
      verticalContainer.style.visibility = "hidden";
      verticalContainer.style.overflow = "scroll";
      verticalContainer.style.width = "100px";
      verticalContainer.style.height = "100px";
      document.body.appendChild(verticalContainer);

      const horizontalContainer = document.createElement("div");
      horizontalContainer.style.visibility = "hidden";
      horizontalContainer.style.overflowX = "scroll";
      horizontalContainer.style.overflowY = "hidden";
      horizontalContainer.style.width = "100px";
      horizontalContainer.style.height = "100px";
      document.body.appendChild(horizontalContainer);

      const width =
        verticalContainer.offsetWidth - verticalContainer.clientWidth;
      const height =
        horizontalContainer.offsetHeight - horizontalContainer.clientHeight;

      document.body.removeChild(verticalContainer);
      document.body.removeChild(horizontalContainer);

      return { width, height };
    };

    setDimensions(calculateDimensions());
  }, []);

  return dimensions;
};
