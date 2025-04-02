import { Helmet } from "react-helmet";
import { useTheme } from "styled-components";
import { getThemeKind } from "../App/styles";
import * as s from "./styles";
import type { GenericPageLayoutProps } from "./types";

export const GenericPageLayout = ({
  title,
  children
}: GenericPageLayoutProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  return (
    <s.Container>
      <Helmet>
        {title && <title>{title}</title>}
        <meta name={"viewport"} content={"width=device-width"} />
      </Helmet>
      <s.Header>
        <a
          target={"_blank"}
          rel={"noopener noreferrer"}
          href={"https://digma.ai"}
        >
          <s.Logo src={`/assets/images/digmaLogo_${themeKind}.svg`} />
        </a>
      </s.Header>
      <s.Content>{children}</s.Content>
      <s.Footer>
        <span>&copy; {new Date().getFullYear()}</span>
        <s.FooterLink
          target={"_blank"}
          rel={"noopener noreferrer"}
          href={"https://digma.ai"}
        >
          digma.ai
        </s.FooterLink>
        <span>&#183; All Rights Reserved</span>
      </s.Footer>
    </s.Container>
  );
};
