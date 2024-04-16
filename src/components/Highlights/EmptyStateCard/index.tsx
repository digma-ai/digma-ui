import { CrossCircleIcon } from "../../common/icons/16px/CrossCircleIcon";
import { RefreshIcon } from "../../common/icons/16px/RefreshIcon";
import * as s from "./styles";
import { EmptyStateCardProps } from "./types";

export const EmptyStateCard = ({ type, text }: EmptyStateCardProps) => {
  const renderContent = () => {
    switch (type) {
      case "loading":
        return (
          <>
            <s.LoadingDataIconContainer>
              <RefreshIcon color={"currentColor"} size={16} />
            </s.LoadingDataIconContainer>
            <s.TextContainer>
              <s.Title>Waiting for Data</s.Title>
              <span>{text}</span>
            </s.TextContainer>
          </>
        );
      case "noData":
        return (
          <>
            <s.NoDataIconContainer>
              <CrossCircleIcon color={"currentColor"} size={16} />
            </s.NoDataIconContainer>
            <s.TextContainer>
              <s.Title>No data</s.Title>
              <span>{text}</span>
            </s.TextContainer>
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
