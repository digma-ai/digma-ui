import { useContext, useEffect } from "react";
import { isString } from "../../../../typeGuards/isString";
import { openURLInDefaultBrowser } from "../../../../utils/actions/openURLInDefaultBrowser";
import { sendTrackingEvent } from "../../../../utils/actions/sendTrackingEvent";
import { sendUserActionTrackingEvent } from "../../../../utils/actions/sendUserActionTrackingEvent";
import { ConfigContext } from "../../../common/App/ConfigContext";
import { ChevronIcon } from "../../../common/icons/16px/ChevronIcon";
import { DigmaLogoIcon } from "../../../common/icons/DigmaLogoIcon";
import { Direction } from "../../../common/icons/types";
import { Button } from "../../../common/v3/Button";
import { actions } from "../../actions";
import { trackingEvents } from "../../tracking";
import { DigmathonInsightCard } from "../DigmathonInsightCard";
import { getProgressEmailLink } from "../getProgressEmailLink";
import * as s from "./styles";
import { ProgressViewProps } from "./types";

const DIGMATHON_URL = "https://www.digma.ai/digmathon";

export const ProgressView = ({ data }: ProgressViewProps) => {
  const config = useContext(ConfigContext);
  useEffect(() => {
    sendTrackingEvent(trackingEvents.DIGMATHON_PROGRESS_VIEWED);
  }, []);

  const handleFindOutMoreButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.DIGMATHON_FIND_OUT_MORE_BUTTON_CLICKED
    );
    openURLInDefaultBrowser(DIGMATHON_URL);
  };

  const handleUpdateProgressButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.DIGMATHON_UPDATE_PROGRESS_BUTTON_CLICKED
    );
    const anchorElement = document.createElement("a");
    anchorElement.href = getProgressEmailLink(data.insights, config);
    anchorElement.click();
    anchorElement.remove();

    window.sendMessageToDigma({
      action: actions.UPDATE_DIGMATHON_PROGRESS_DATA
    });
  };

  const handleDigmathonLeaderboard = () => {
    sendUserActionTrackingEvent(
      trackingEvents.DIGMATHON_LEADERBOARD_BUTTON_CLICKED
    );
    openURLInDefaultBrowser(DIGMATHON_URL);
  };

  const foundIssuesCount = data.insights.filter((x) =>
    isString(x.foundAt)
  ).length;

  const isNewProgressDataAvailable =
    (data.insights.length > 0 && data.lastUpdatedByUserAt === null) ||
    data.insights.some(
      (x) =>
        isString(x.foundAt) &&
        isString(data.lastUpdatedByUserAt) &&
        new Date(x.foundAt).valueOf() >=
          new Date(data.lastUpdatedByUserAt).valueOf()
    );

  if (foundIssuesCount === 0) {
    return (
      <s.EmptyStateContainer>
        <s.EmptyStateContentContainer>
          <DigmaLogoIcon size={68} />
          <s.EmptyStateTextContainer>
            <s.EmptyStateTitle>Start Digmathon</s.EmptyStateTitle>
            <span>
              To get started run your code with Digma and begin unlocking
              issues. Check back here to see your progress!
            </span>
          </s.EmptyStateTextContainer>
          <Button
            label={"Find out more"}
            onClick={handleFindOutMoreButtonClick}
          />
        </s.EmptyStateContentContainer>
      </s.EmptyStateContainer>
    );
  }

  return (
    <>
      <s.Header>
        <s.IssuesCounter>
          <s.FoundIssuesNumber $isNew={isNewProgressDataAvailable}>
            {foundIssuesCount}
          </s.FoundIssuesNumber>{" "}
          issues found
        </s.IssuesCounter>
        {isNewProgressDataAvailable && (
          <s.NewIssuesFoundMessage>
            New issues found, please update the progress
            <ChevronIcon direction={Direction.RIGHT} color={"currentColor"} />
          </s.NewIssuesFoundMessage>
        )}
        <Button
          label={"Update progress"}
          onClick={handleUpdateProgressButtonClick}
          // TODO: add glance effect instead of disabling the button
        />
        <Button
          buttonType={"secondary"}
          label={"Leaderboard"}
          onClick={handleDigmathonLeaderboard}
        />
      </s.Header>
      <s.CardsContainer>
        {data.insights.map((x, i) =>
          x.data ? (
            <DigmathonInsightCard
              number={i + 1}
              data={x.data}
              key={x.type}
              isActive={isString(x.foundAt)}
            />
          ) : null
        )}
      </s.CardsContainer>
    </>
  );
};
