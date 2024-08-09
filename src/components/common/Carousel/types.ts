import { Options } from "@splidejs/react-splide";
import { ReactNode } from "react";

export interface CarouselProps {
  items: ReactNode[];
  itemsPerSlide?: number;
  breakpoints: Options["breakpoints"];
  gap?: number | string;
}

export interface CarouselButtonProps {
  direction: "left" | "right";
}
