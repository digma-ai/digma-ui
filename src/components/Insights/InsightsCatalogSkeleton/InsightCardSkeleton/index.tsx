import { Skeleton } from "../../../common/Skeleton";
import { Card } from "../../../common/v3/Card";
import * as s from "./styles";

const KeyValueSkeleton = () => (
  <s.KeyValueSkeleton>
    <Skeleton type={"text"} />
    <Skeleton type={"circle"} />
  </s.KeyValueSkeleton>
);

const FooterButtonSkeleton = () => (
  <Skeleton type={"rectangle"} width={81} height={28} />
);

export const InsightCardSkeleton = () => (
  <Card
    header={
      <s.HeaderContainer>
        <Skeleton type={"rectangle"} height={24} width={24} />
        <Skeleton type={"text"} width={96} />
      </s.HeaderContainer>
    }
    content={
      <s.ContentContainer>
        <KeyValueSkeleton />
        <KeyValueSkeleton />
        <KeyValueSkeleton />
      </s.ContentContainer>
    }
    footer={
      <s.FooterContainer>
        <FooterButtonSkeleton />
        <FooterButtonSkeleton />
      </s.FooterContainer>
    }
  />
);
