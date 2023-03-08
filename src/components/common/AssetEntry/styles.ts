import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
  background: #383838;
  border-radius: 4px;
  color: #9b9b9b;
`;

export const Header = styled.div`
  display: flex;
  gap: 2px;
  height: 20px;
  align-items: center;
`;

export const OpenTelemetryIconContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 20px;
  height: 20px;
  align-items: center;
`;

export const Link = styled.a`
  color: #7891d0;
  text-decoration: none;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const InsightIconsContainer = styled.div`
  display: flex;
  gap: 2px;
  margin-left: auto;
`;

export const InsightIconContainer = styled(OpenTelemetryIconContainer)`
  background: #2e2e2e;
  border-radius: 4px;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  line-height: 12px;
`;

export const Stats = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  &:first-child {
    width: 40%;
  }

  &:nth-child(2) {
    width: 20%;
  }

  &:nth-child(3) {
    width: 20%;
  }
`;

export const ServicesContainer = styled.div`
  display: flex;
  gap: 2px;
  align-items: center;
`;

export const ServiceName = styled.div`
  padding: 4px 6px;
  background: #2e2e2e;
  border-radius: 23px;
  width: fit-content;
  line-height: 8px;
`;

export const ValueContainer = styled.div`
  display: flex;
  align-items: flex-end;
  color: #c6c6c6;
  gap: 2px;
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
`;

export const Suffix = styled.span`
  font-weight: 500;
  font-size: 11px;
  line-height: 14px;
  color: #565757;
`;
