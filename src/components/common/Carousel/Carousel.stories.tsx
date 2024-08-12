import { Meta, StoryObj } from "@storybook/react";
import { Carousel } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof Carousel> = {
  title: "common/Carousel",
  component: Carousel,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      <div key={1}>1</div>,
      <div key={2}>2</div>,
      <div key={3}>3</div>,
      <div key={4}>4</div>,
      <div key={5}>5</div>,
      <div key={6}>6</div>,
      <div key={7}>7</div>,
      <div key={8}>8</div>
    ],
    itemsPerSlide: 3,
    breakpoints: {
      461: {
        perPage: 4
      },
      561: {
        perPage: 5
      }
    }
  }
};
