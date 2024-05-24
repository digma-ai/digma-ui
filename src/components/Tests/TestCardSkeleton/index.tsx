import { Skeleton } from "../../common/Skeleton";
import { Card } from "../../common/v3/Card";
import * as s from "./styles";

export const TestCardSkeleton = () => (
  <Card
    header={
      <s.HeaderContainer>
        <Skeleton type={"rectangle"} width={24} />
        <Skeleton type={"text"} width={96} />
      </s.HeaderContainer>
    }
    content={
      <s.ContentContainer>
        <Skeleton type={"text"} width={96} />
        <Skeleton type={"text"} />
        <s.ButtonsContainer>
          <Skeleton type={"rectangle"} width={81} />
          <Skeleton type={"rectangle"} width={81} />
        </s.ButtonsContainer>
      </s.ContentContainer>
    }
  />
);
