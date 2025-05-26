import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  padding: 16px 24px;
  gap: 24px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.v3.stroke.tertiary};
  overflow: hidden;
`;

export const Input = styled.input`
  color: ${({ theme }) => theme.colors.v3.text.tertiary};
  font-size: 20px;
  background: none;
  border: none;
  outline: none;
  flex-grow: 1;
  min-width: 0;

  &::placeholder {
    color: ${({ theme }) => theme.colors.v3.text.tertiary};
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 31px;
  height: 32px;
  padding: 8px 5px 8px 10px;
  border-radius: 8px;
  background: rgb(255 255 255 / 5%);
  color: ${({ theme }) => theme.colors.v3.icon.primary};
  border: none;
  cursor: pointer;
  flex-shrink: 0;
`;
