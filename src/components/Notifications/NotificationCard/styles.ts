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
  gap: 4px;
  width: 100%;
`;

export const Title = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const IconContainer = styled.div`
  flex-shrink: 0;
`;

export const TimeDistance = styled.span`
  font-weight: 400;
  flex-shrink: 0;
  margin-left: auto;
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
  word-break: break-all;
`;

export const SpanLink = styled(Link)`
  text-decoration: none;
  font-weight: 500;
  color: #92affa;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: fit-content;
`;
