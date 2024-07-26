import { Card } from "../../common/Card";
import { ReportsHeader } from "./ReportsHeader";
import * as s from "./styles";

export const Reports = () => {
  return (
    <s.Container>
      <ReportsHeader />
      <s.Content>
        <s.Column key={"issues"}>
          <Card content="test" header="test" />
        </s.Column>
        <s.Column key={"assets"}></s.Column>
      </s.Content>
    </s.Container>
  );
};
