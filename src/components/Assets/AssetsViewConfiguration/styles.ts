import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 8px;
  padding: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0 0 0 / 29%);
  font-size: 14px;
`;

export const Item = styled.div<{ $position: "left" | "right" }>`
  display: flex;
  ${({ $position }) => {
    if ($position === "left") {
      return "margin-right: auto";
    }
    return "margin-left: auto;";
  }}
`;
