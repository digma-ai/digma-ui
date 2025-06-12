import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { WelcomeScreen } from ".";

const meta: Meta<typeof WelcomeScreen> = {
  title: "Recent Activity/WelcomeScreen",
  component: WelcomeScreen,
  parameters: {
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof WelcomeScreen>;

export const Default: Story = {};
