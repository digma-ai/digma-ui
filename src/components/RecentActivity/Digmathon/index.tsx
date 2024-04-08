import { useEffect } from "react";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { NewCircleLoader } from "../../common/NewCircleLoader";
import { ChevronIcon } from "../../common/icons/16px/ChevronIcon";
import { Direction } from "../../common/icons/types";
import { trackingEvents } from "../tracking";
import { DigmathonInsightData } from "../types";
import { CongratulationsView } from "./CongratulationsView";
import { ProgressView } from "./ProgressView";
import * as s from "./styles";
import { DigmathonProgressProps } from "./types";

export const Digmathon = ({
  data,
  getData,
  foundIssuesCount,
  isDigmathonCompleted,
  onGoBack
}: DigmathonProgressProps) => {
  useEffect(() => {
    getData();
  }, []);

  const handleGoBackButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.DIGMATHON_VIEW_BACK_BUTTON_CLICKED
    );
    onGoBack();
  };

  const renderContent = (data: DigmathonInsightData[]) =>
    isDigmathonCompleted ? (
      <CongratulationsView data={data} />
    ) : (
      <ProgressView data={data} foundIssuesCount={foundIssuesCount} />
    );

  return (
    <s.Container>
      <s.Header>
        <s.BackButton onClick={handleGoBackButtonClick}>
          <ChevronIcon
            size={16}
            color={"currentColor"}
            direction={Direction.LEFT}
          />
          Back
        </s.BackButton>
        <s.Divider />
        Digmathon
      </s.Header>
      {data ? (
        renderContent(data)
      ) : (
        <s.LoaderContainer>
          <NewCircleLoader size={32} />
        </s.LoaderContainer>
      )}
    </s.Container>
  );
};
