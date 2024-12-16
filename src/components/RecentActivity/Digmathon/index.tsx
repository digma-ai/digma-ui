import { useEffect } from "react";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { NewCircleLoader } from "../../common/NewCircleLoader";
import { ChevronIcon } from "../../common/icons/16px/ChevronIcon";
import { Direction } from "../../common/icons/types";
import { trackingEvents } from "../tracking";
import type { DigmathonProgressData } from "../types";
import { CongratulationsView } from "./CongratulationsView";
import { ProgressView } from "./ProgressView";
import * as s from "./styles";
import type { DigmathonProgressProps } from "./types";

export const Digmathon = ({
  data,
  getData,
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

  const handleExitButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.DIGMATHON_VIEW_EXIT_BUTTON_CLICKED
    );
    onGoBack();
  };

  const renderContent = (data: DigmathonProgressData) =>
    isDigmathonCompleted ? (
      <CongratulationsView data={data.insights} />
    ) : (
      <ProgressView data={data} />
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
        <s.ExitButton
          buttonType={"secondary"}
          label={"Exit"}
          onClick={handleExitButtonClick}
        />
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
