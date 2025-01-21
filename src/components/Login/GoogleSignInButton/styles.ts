import styled from "styled-components";
import { getMainFont } from "../../common/App/styles";

export const Button = styled.button`
  ${getMainFont("Roboto")}

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid #747775;
  background: #fff;
  color: #1f1f1f;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
`;
