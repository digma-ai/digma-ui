import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { RegistrationCard } from ".";
import { ConfigContext, initialState } from "../../common/App/ConfigContext";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof RegistrationCard> = {
  title: "Main/RegistrationCard",
  component: RegistrationCard,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof RegistrationCard>;

export const Default: Story = {
  args: {}
};

export const WithEmail: Story = {
  args: {},
  decorators: [
    (Story) => (
      <ConfigContext.Provider
        value={{
          ...initialState,
          userEmail: "test@email.com"
        }}
      >
        <Story />
      </ConfigContext.Provider>
    )
  ]
};
