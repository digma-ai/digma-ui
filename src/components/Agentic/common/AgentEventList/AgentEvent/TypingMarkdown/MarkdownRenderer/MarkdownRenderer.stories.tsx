import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { MarkdownRenderer } from ".";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MarkdownRenderer> = {
  title:
    "Agentic/common/AgentEventList/AgentEvent/TypingMarkdown/MarkdownRenderer",
  component: MarkdownRenderer,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen"
  }
};

export default meta;

type Story = StoryObj<typeof MarkdownRenderer>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    text: `# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

This is a paragraph with some **bold text**, *italic text* and \`code\`.

> This is a blockquote. It can span multiple lines and is used to highlight important information.

[Link](https://example.com)

Here is a code block:
\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

Ordered list:
1. Item 1
2. Item 2
3. Item 3

Unordered list:
- Item 1
- Item 2 
- Item 3

Nested list:
1. Item 1
    - Subitem 1
    - Subitem 2
2. Item 2
    - Subitem 1
    - Subitem 2
`
  }
};

export const Heading1: Story = {
  args: {
    text: `# Heading 1`
  }
};

export const Heading2: Story = {
  args: {
    text: `## Heading 2`
  }
};

export const Heading3: Story = {
  args: {
    text: `### Heading 3`
  }
};

export const Heading4: Story = {
  args: {
    text: `#### Heading 4`
  }
};

export const Heading5: Story = {
  args: {
    text: `##### Heading 5`
  }
};

export const Heading6: Story = {
  args: {
    text: `###### Heading 6`
  }
};

export const Paragraph: Story = {
  args: {
    text: `This is a paragraph text`
  }
};

export const Code: Story = {
  args: {
    text: `\`javascript\``
  }
};

export const CodeBlock: Story = {
  args: {
    text: `\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\``
  }
};

export const UnorderedList: Story = {
  args: {
    text: `- Item 1
- Item 2
- Item 3`
  }
};

export const OrderedList: Story = {
  args: {
    text: `1. First item
2. Second item
3. Third item`
  }
};

export const Blockquote: Story = {
  args: {
    text: `> This is a blockquote. It can span multiple lines and is used to highlight important information.`
  }
};

export const Link: Story = {
  args: {
    text: `[Link](https://example.com)`
  }
};

export const StrongText: Story = {
  args: {
    text: `This is some **strong text** that should be emphasized.`
  }
};

export const EmphasisText: Story = {
  args: {
    text: `This is some *emphasized text* that should be italicized.`
  }
};
