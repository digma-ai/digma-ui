import * as s from "./styles";
import type { HeaderContentProps } from "./types";

export const HeaderContent = ({
  children,
  toolbarContent
}: HeaderContentProps) => {
  return (
    <s.Container>
      {children}
      {toolbarContent && (
        <s.FilterContainer>{toolbarContent}</s.FilterContainer>
      )}
    </s.Container>
  );
};
