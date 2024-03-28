import { RefreshIcon } from "../../common/icons/16px/RefreshIcon";
import { CrossCircleIcon } from "../../common/icons/CrossCircleIcon";
import * as s from "./styles";
import { EmptyStateCardProps } from "./types";

export const EmptyStateCard = ({ isLoading }: EmptyStateCardProps) => {
  const renderContent = () => {
    if (isLoading) {
      return (
        <>
          <s.LoadingDataIconContainer>
            <RefreshIcon color={"currentColor"} size={16} />
          </s.LoadingDataIconContainer>
          <s.TextContainer>
            <s.Title>Waiting for Data</s.Title>
            <span>Detected issues will appear here</span>
          </s.TextContainer>
        </>
      );
    }

    return (
      <>
        <s.NoDataIconContainer>
          <CrossCircleIcon color={"currentColor"} size={16} />
        </s.NoDataIconContainer>
        <s.TextContainer>
          <s.Title>No data</s.Title>
          <span>No Issues available at the moment</span>
        </s.TextContainer>
      </>
    );
  };

  return (
    <s.Card
      content={<s.ContentContainer>{renderContent()}</s.ContentContainer>}
    />
  );
};
