import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { ChevronIcon as ChevronIcon16px } from "../../../common/icons/16px/ChevronIcon";
import { Direction } from "../../../common/icons/types";
import { Tooltip } from "../../../common/v3/Tooltip";
import { Score } from "../../Score";
import { getErrorMethodId } from "../../getErrorMethodId";
import { trackingEvents } from "../../tracking";
import * as s from "./styles";
import { ErrorDetailsCardHeaderProps } from "./types";

export const ErrorDetailsCardHeader = ({
  onGoBack,
  data
}: ErrorDetailsCardHeaderProps) => {
  const name = data.name;
  const location = getErrorMethodId(data.sourceCodeObjectId ?? "");
  const scoreInfo = data.scoreInfo;

  const handleBackButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.BACK_BUTTON_CLICKED);
    onGoBack();
  };
  return (
    <s.Container>
      <s.TitleRow>
        <s.BackButton onClick={handleBackButtonClick}>
          <ChevronIcon16px
            direction={Direction.LEFT}
            size={16}
            color={"currentColor"}
          />
        </s.BackButton>
        <Tooltip title={name}>
          <s.Title>{name}</s.Title>
        </Tooltip>
        <s.ScoreContainer>
          <Score data={scoreInfo} />
        </s.ScoreContainer>
      </s.TitleRow>
      <s.SubtitleRow>
        <span>From </span>
        <Tooltip title={location}>
          <s.LocationName>{location}</s.LocationName>
        </Tooltip>
      </s.SubtitleRow>
    </s.Container>
  );
};
