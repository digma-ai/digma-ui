import styled from "styled-components";
import { NewButton } from "../../../../common/v3/NewButton";

export const Container = styled.div`
  display: flex;
  padding: 11px 32px;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.v3.stroke.dark};
  align-items: center;
  background: ${({ theme }) => theme.colors.v3.surface.secondary};
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 16px;
`;

export const DownloadButton = styled(NewButton)`
  color: ${({ theme }) => theme.colors.v3.text.link};

  span {
    color: ${({ theme }) => theme.colors.v3.text.link};
  }
`;

export const ThemedLogoIcon = styled.img`
  content: ${({ theme }) =>
    theme.mode === "light"
      ? "url('images/reports-ribbon-logo-light.svg')"
      : "url('images/reports-ribbon-logo-dark.svg')"};
`;
