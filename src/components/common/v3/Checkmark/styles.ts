import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const CheckmarkContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Checkmark = styled.input`
  appearance: none;
  margin: 1px;
  cursor: pointer;
  border: 1px solid ${({ theme }) => theme.colors.v3.surface.highlight};
  width: 12px;
  height: 12px;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.v3.surface.highlight};

  &:disabled {
    background: ${({ theme }) => theme.colors.v3.surface.gray};
  }

  &:checked + ${CheckmarkContainer} {
    color: ${({ theme }) => theme.colors.v3.status.success};
  }

  &:disabled + ${CheckmarkContainer} {
    color: ${({ theme }) => theme.colors.v3.stroke.primary};
  }
`;
