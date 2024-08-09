import {
  Options,
  Splide,
  SplideSlide,
  SplideTrack
} from "@splidejs/react-splide";
import "@splidejs/react-splide/css/core";
import { v4 as uuidv4 } from "uuid";
import { ChevronIcon } from "../icons/12px/ChevronIcon";
import { Direction } from "../icons/types";
import * as s from "./styles";
import { CarouselProps } from "./types";

export const Carousel = ({
  items,
  itemsPerSlide = 1,
  gap,
  breakpoints
}: CarouselProps) => {
  const options: Options = {
    perPage: itemsPerSlide,
    gap,
    type: "loop",
    perMove: 1,
    arrows: true,
    pagination: false,
    isNavigation: true,
    mediaQuery: "min",
    breakpoints,
    focus: "center"
  };

  return (
    <s.Container>
      <Splide hasTrack={false} options={options}>
        <SplideTrack>
          {items.map((item) => (
            <SplideSlide key={uuidv4()}>{item}</SplideSlide>
          ))}
        </SplideTrack>
        <div className="splide__arrows">
          <s.CarouselButton
            className="splide__arrow splide__arrow--prev"
            icon={(props) => (
              <ChevronIcon {...props} direction={Direction.LEFT} />
            )}
            direction={"left"}
          />
          <s.CarouselButton
            className="splide__arrow splide__arrow--next"
            icon={(props) => (
              <ChevronIcon {...props} direction={Direction.RIGHT} />
            )}
            direction={"right"}
          />
        </div>
      </Splide>
    </s.Container>
  );
};
