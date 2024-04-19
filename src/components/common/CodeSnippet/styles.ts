import styled from "styled-components";
import { getCodeFont } from "../App/styles";
import { codeRegularTypography } from "../App/typographies";

export const Container = styled.div`
  border-radius: 4px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme.colors.v3.surface.gray};
`;

export const Code = styled.code`
  ${codeRegularTypography}

  ${({ theme }) => getCodeFont(theme.codeFont)}

  white-space: pre-wrap;
  word-break: break-word;
  padding: 6px 0 6px 8px;
  color: ${({ theme }) => theme.colors.v3.text.primary};
`;
