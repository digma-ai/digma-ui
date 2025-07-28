import styled, { css } from "styled-components";
import { getCodeFont } from "../../../../../../common/App/styles";
import {
  codeRegularTypography,
  subheading1RegularTypography
} from "../../../../../../common/App/typographies";
import { CodeSnippet } from "../../../../../../common/CodeSnippet";
import { Link } from "../../../../../../common/v3/Link";

export const textStyles = css`
  font-size: ${({ theme }) => theme.typographies.subheading1.fontSize}px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.typographies.subheading1.fontSize}px;
  display: inline;
`;

export const StyledCodeSnippet = styled(CodeSnippet)`
  margin: 8px 0;
`;

export const Paragraph = styled.p`
  ${subheading1RegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  margin: 4px 0;
`;

export const Code = styled.code`
  ${codeRegularTypography}
  ${({ theme }) => getCodeFont(theme.codeFont)}

  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const Heading1 = styled.h1`
  font-size: 30px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  margin: 8px 0;
`;

export const Heading2 = styled.h2`
  font-size: 26px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  margin: 4px 0;
`;

export const Heading3 = styled.h3`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  margin: 4px 0;
`;

export const Heading4 = styled.h4`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  margin: 4px 0;
`;

export const Heading5 = styled.h5`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  margin: 4px 0;
`;

export const Heading6 = styled.h6`
  font-size: 22px;
  color: ${({ theme }) => theme.colors.v3.text.secondary};
  margin: 4px 0;
`;

export const UnorderedList = styled.ul`
  ${textStyles}
  margin: 4px 0;
`;

export const OrderedList = styled.ol`
  ${textStyles}
  margin: 4px 0;
`;

export const ListItem = styled.li`
  ${textStyles}
`;

export const Blockquote = styled.blockquote`
  ${textStyles}
  margin-top: 4px;
  margin-bottom: 4px;
`;

export const Strong = styled.strong`
  ${textStyles}
`;

export const Emphasis = styled.em`
  ${textStyles}
`;
