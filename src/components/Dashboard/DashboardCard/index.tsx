import * as s from "./styles";
import type { DashboardCardProps } from "./types";

export const DashboardCard = ({
  title,
  icon: Icon,
  headerContent,
  content
}: DashboardCardProps) => (
  <s.Container>
    <s.Header>
      <s.Title>
        <s.IconContainer>
          <Icon size={16} color={"currentColor"} />
        </s.IconContainer>
        {title}
      </s.Title>
      {headerContent}
    </s.Header>
    {content}
  </s.Container>
);
