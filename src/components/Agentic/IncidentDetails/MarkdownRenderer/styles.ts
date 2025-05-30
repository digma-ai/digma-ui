import styled, { css } from "styled-components";
import { getCodeFont } from "../../../common/App/styles";
import {
  codeRegularTypography,
  subheading1RegularTypography
} from "../../../common/App/typographies";
import { CodeSnippet } from "../../../common/CodeSnippet";
import { Link } from "../../../common/v3/Link";

export const textStyles = css`
  ${subheading1RegularTypography}
  color: ${({ theme }) => theme.colors.v3.text.secondary};
`;

export const StyledLink = styled(Link)`
  ${textStyles}
`;

export const StyledCodeSnippet = styled(CodeSnippet)`
  margin: 8px 0;
`;

export const Paragraph = styled.p`
  ${textStyles}
`;

export const Code = styled.code`
  ${codeRegularTypography}
  ${({ theme }) => getCodeFont(theme.codeFont)}

  color: ${({ theme }) => theme.colors.v3.text.primary};
`;

export const Heading1 = styled.h1`
  ${textStyles}
`;

export const Heading2 = styled.h2`
  ${textStyles}
`;

export const Heading3 = styled.h3`
  ${textStyles}
`;

export const Heading4 = styled.h4`
  ${textStyles}
`;

export const Heading5 = styled.h5`
  ${textStyles}
`;

export const Heading6 = styled.h6`
  ${textStyles}
`;

export const UnorderedList = styled.ul`
  ${textStyles}
`;

export const OrderedList = styled.ol`
  ${textStyles}
`;

export const ListItem = styled.li`
  ${textStyles}
`;

export const Blockquote = styled.blockquote`
  ${textStyles}
`;

export const Strong = styled.strong`
  ${textStyles}
`;

export const Emphasis = styled.em`
  ${textStyles}
`;
