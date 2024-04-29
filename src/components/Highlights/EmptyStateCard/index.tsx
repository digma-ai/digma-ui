import { CrossCircleIcon } from "../../common/icons/16px/CrossCircleIcon";
import { RefreshIcon } from "../../common/icons/16px/RefreshIcon";
import { InfinityIcon } from "../../common/icons/InfinityIcon";
import * as s from "./styles";
import { EmptyStateCardProps } from "./types";

export const EmptyStateCard = ({
  type,
  title,
  text,
  customContent
}: EmptyStateCardProps) => {
  const renderContent = () => {
    switch (type) {
      case "loading":
        return (
          <>
            <s.LoadingDataIconContainer>
              <RefreshIcon color={"currentColor"} size={16} />
            </s.LoadingDataIconContainer>
            <s.TextContainer>
              <s.Title>{title || "Waiting for Data"}</s.Title>
              <span>{text}</span>
            </s.TextContainer>
            {customContent}
          </>
        );
      case "noData":
        return (
          <>
            <s.InactiveIconContainer>
              <CrossCircleIcon color={"currentColor"} size={16} />
            </s.InactiveIconContainer>
            <s.TextContainer>
              <s.Title>{title || "No data"}</s.Title>
              <span>{text}</span>
            </s.TextContainer>
            {customContent}
          </>
        );
      case "unlock":
        return (
          <>
            <s.InactiveIconContainer>
              <InfinityIcon color={"currentColor"} size={16} />
            </s.InactiveIconContainer>
            <s.TextContainer>
              <s.Title>{title}</s.Title>
              <span>{text}</span>
            </s.TextContainer>
            {customContent}
          </>
        );
    }
  };

  return (
    <s.Card
      content={<s.ContentContainer>{renderContent()}</s.ContentContainer>}
    />
  );
};
