import styled from "styled-components";
import { Card } from "../../common/v3/Card";
import {
  Content as CardContent,
  Header as CardHeader
} from "../../common/v3/Card/styles";

export const Container = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

export const ErrorDetailsCard = styled(Card)`
  height: 100%;
  min-height: 450px;
  overflow: hidden;

  & > ${CardHeader} {
    height: initial;
  }

  & > ${CardContent} {
    overflow: hidden;
  }
`;
