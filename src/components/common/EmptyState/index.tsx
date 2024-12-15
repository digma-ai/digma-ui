import { useTheme } from "styled-components";
import { getThemeKind } from "../../common/App/styles";
import * as s from "./styles";
import type { EmptyStateProps } from "./types";

export const EmptyState = ({ icon: Icon, title, content }: EmptyStateProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  return (
    <s.Container>
      {Icon && (
        <s.IconContainer>
          <Icon size={72} color={"currentColor"} themeKind={themeKind} />
        </s.IconContainer>
      )}
      <s.Title>{title}</s.Title>
      {content}
    </s.Container>
  );
};
