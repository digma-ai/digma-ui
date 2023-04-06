import styled from "styled-components";
import { CircleProps, SwitchContainerProps } from "./types";

export const Container = styled.div`
  display: flex;
  color: #fff;
  font-size: 10px;
  font-weight: 500;
  line-height: 12px;
  gap: 10px;
  padding: 8px 2px 8px 0;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;

export const SwitchContainer = styled.div<SwitchContainerProps>`
  border-radius: 8px;
  background: ${({ isChecked }) => (isChecked ? "#3538cd" : "#7c7c94")};
  width: 28px;
  height: 16px;
  transition-property: background;
  transition-duration: 0.3s;
  display: flex;
  align-items: center;
`;

export const Circle = styled.div<CircleProps>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ isChecked }) => (isChecked ? "#fbfdff" : "#b9c0d4")};
  margin-left: ${({ isChecked }) => (isChecked ? "16px" : "4px")};
  transition-property: background, margin-left;
  transition-duration: 0.3s;
`;
