import { Performance } from "./Performance";
import { TopIssues } from "./TopIssues";
import * as s from "./styles";

export const Highlights = () => {
  return (
    <s.Container>
      <TopIssues />
      <Performance />
    </s.Container>
  );
};
