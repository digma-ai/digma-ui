import styled from "styled-components";
import { Button as CommonButton } from "../../common/Button";

export const LastCall = styled.span`
  display: flex;
  font-size: 10px;
  line-height: normal;
  font-weight: 500;
  margin-bottom: 8px;
`;

export const PercentileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Percentile = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 10px;
  line-height: normal;
  font-weight: 500;
`;

export const Button = styled(CommonButton)`
  margin-left: auto;
`;
