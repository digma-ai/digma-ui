import styled from "styled-components";
import { Card as CommonCard } from "../../common/Card";
import { Link } from "../../common/Link";

export const Card = styled(CommonCard)`
  position: relative;
`;

export const Container = styled.div`
  position: relative;
`;

export const BadgeContainer = styled.div`
  position: absolute;
  top: -3px;
  left: -3px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 4px;
  width: 100%;
`;

export const Title = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const TimeDistance = styled.span`
  font-weight: 400;
  color: ${({ theme }) => {
    switch (theme.mode) {
      case "light":
        return "#818594";
      case "dark":
      case "dark-jetbrains":
        return "#b4b8bf";
    }
  }};
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SpanLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  color: #92affa;
`;
