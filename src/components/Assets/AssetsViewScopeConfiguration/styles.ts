import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  font-size: 14px;
  flex-grow: 1;
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
