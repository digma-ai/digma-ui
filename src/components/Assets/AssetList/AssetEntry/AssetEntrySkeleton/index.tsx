import { Skeleton } from "../../../../common/Skeleton";
import * as s from "../styles";
export const AssetEntrySkeleton = () => (
  <s.Container>
    <s.Header>
      <s.TitleRow>
        <Skeleton type={"circle"} height={16} />
        <Skeleton type={"text"} width={96} />
      </s.TitleRow>
    </s.Header>
    <Skeleton type={"text"} width={96} />
    <s.StatsContainer>
      <s.StatsColumn>
        <s.Stat>
          <Skeleton type={"text"} width={96} />
          <Skeleton type={"circle"} height={24} />
        </s.Stat>
        <s.Stat>
          <Skeleton type={"text"} width={96} />
          <Skeleton type={"circle"} height={24} />
        </s.Stat>
      </s.StatsColumn>
      <s.StatsColumn>
        <s.Stat>
          <Skeleton type={"text"} width={96} />
          <Skeleton type={"circle"} height={24} />
        </s.Stat>
        <s.Stat>
          <Skeleton type={"text"} width={96} />
          <Skeleton type={"circle"} height={24} />
        </s.Stat>
      </s.StatsColumn>
    </s.StatsContainer>
  </s.Container>
);
