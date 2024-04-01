import styled from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";
import { subscriptRegularTypography } from "../../App/typographies";
import { ContainerProps, TagType } from "./types";

const getTagTheme = (
  theme: DefaultTheme,
  type?: TagType
): { text: string; background: string } => {
  const typeMap = {
    default: {
      text: theme.colors.v3.text.secondary,
      background: theme.colors.v3.surface.primary
    },
    highlight: {
      text: theme.colors.v3.text.secondary,
      background: theme.colors.v3.surface.highlight
    },
    highSeverity: {
      text: theme.colors.v3.status.high,
      background: theme.colors.v3.status.backgroundHigh
    },
    mediumSeverity: {
      text: theme.colors.v3.status.medium,
      background: theme.colors.v3.status.backgroundMedium
    },
    lowSeverity: {
      text: theme.colors.v3.status.low,
      background: theme.colors.v3.status.backgroundLow
    },
    success: {
      text: theme.colors.v3.status.success,
      background: theme.colors.v3.status.backgroundSuccess
    }
  };

  if (!type) {
    return typeMap.default;
  }

  return typeMap[type];
};

export const Container = styled.div<ContainerProps>`
  ${subscriptRegularTypography}

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  min-width: 24px;
  max-width: fit-content;
  color: ${({ theme, $type }) => getTagTheme(theme, $type).text};
  background: ${({ theme, $type }) => getTagTheme(theme, $type).background};
`;

export const ValueContainer = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 4px;
`;
