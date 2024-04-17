import styled from "styled-components";
import { footnoteRegularTypography } from "../../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 4px;
  background: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#f7f8fa";
      case "dark":
      case "dark-jetbrains":
        return "#2b2d30";
    }
  }};

  & > * {
    flex: 1 1 0;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TitleSection = styled(Section)`
  padding: 16px 0 24px;
  font-size: 16px;
  font-weight: 700;
`;

export const SectionContent = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Term = styled.span`
  font-weight: 700;
`;

export const Arrow = styled.img`
  display: block;
  margin-top: auto;
  width: 25%;
  min-width: 33px;
`;
