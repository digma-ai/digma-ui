import styled from "styled-components";
import {
  footnoteRegularTypography,
  subheadingBoldTypography
} from "../../../../common/App/typographies";

export const Container = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.v3.surface.primary};

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
  ${subheadingBoldTypography}

  color: ${({ theme }) => theme.colors.v3.text.primary};
  padding: 16px 0 24px;
`;

export const SectionContent = styled.div`
  ${footnoteRegularTypography}

  display: flex;
  flex-direction: column;
  gap: 12px;
`;
