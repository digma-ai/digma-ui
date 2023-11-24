import * as s from "./styles";
import { DashboardCardProps } from "./types";

export const DashboardCard = (props: DashboardCardProps) => (
  <s.Container>
    <s.Header>
      <s.Title>
        <s.IconContainer>
          <props.icon size={16} color={"currentColor"} />
        </s.IconContainer>
        {props.title}
      </s.Title>
      {props.headerContent}
    </s.Header>
    {props.content}
  </s.Container>
);
