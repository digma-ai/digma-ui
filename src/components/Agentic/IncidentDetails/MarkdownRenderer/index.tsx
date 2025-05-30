import { isValidElement, type ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import * as s from "./styles";
import type { MarkdownRendererProps } from "./types";

export const MarkdownRenderer = ({ text }: MarkdownRendererProps) => (
  <ReactMarkdown
    components={{
      p: ({ children }) => <s.Paragraph>{children}</s.Paragraph>,
      code: ({ children }) => <s.Code>{children}</s.Code>,
      pre: ({ children }) => {
        const codeElement = isValidElement(children)
          ? (children as ReactElement<{
              className?: string;
              children?: string;
            }>)
          : null;

        if (!codeElement) {
          return null;
        }

        const language =
          codeElement.props.className?.replace("language-", "") ?? undefined;

        const codeContent = codeElement.props.children;
        if (!codeContent) {
          return null;
        }

        return (
          <s.StyledCodeSnippet text={String(codeContent)} language={language} />
        );
      },
      h1: ({ children }) => <s.Heading1>{children}</s.Heading1>,
      h2: ({ children }) => <s.Heading2>{children}</s.Heading2>,
      h3: ({ children }) => <s.Heading3>{children}</s.Heading3>,
      h4: ({ children }) => <s.Heading4>{children}</s.Heading4>,
      h5: ({ children }) => <s.Heading5>{children}</s.Heading5>,
      h6: ({ children }) => <s.Heading6>{children}</s.Heading6>,
      ul: ({ children }) => <s.UnorderedList>{children}</s.UnorderedList>,
      ol: ({ children }) => <s.OrderedList>{children}</s.OrderedList>,
      li: ({ children }) => <s.ListItem>{children}</s.ListItem>,
      blockquote: ({ children }) => <s.Blockquote>{children}</s.Blockquote>,
      strong: ({ children }) => <s.Strong>{children}</s.Strong>,
      em: ({ children }) => <s.Emphasis>{children}</s.Emphasis>,
      a: ({ children, href }) => (
        <s.StyledLink href={href} target={"_blank"} rel={"noopener noreferrer"}>
          {children}
        </s.StyledLink>
      )
    }}
  >
    {text}
  </ReactMarkdown>
);
