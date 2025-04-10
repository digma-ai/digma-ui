import { useTheme } from "styled-components";
import { getFeatureFlagValue } from "../../../../../featureFlags";
import { useGetAboutQuery } from "../../../../../redux/services/digma";
import { FeatureFlag } from "../../../../../types";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { getThemeKind } from "../../../../common/App/styles";
import { WarningTriangleIcon } from "../../../../common/icons/12px/WarningTriangleIcon";
import { MeterHighIcon } from "../../../../common/icons/16px/MeterHighIcon";
import { ChevronIcon } from "../../../../common/icons/20px/ChevronIcon";
import { Direction } from "../../../../common/icons/types";
import { Tooltip } from "../../../../common/v3/Tooltip";
import { trackingEvents } from "../../../tracking";
import { OverviewWidget } from "../OverviewWidget";
import * as s from "./styles";
import type { TopIssuesWidgetProps } from "./types";

export const TopIssuesWidget = ({
  onGetIssuesByCriticality,
  onGetIssuesBySeverity
}: TopIssuesWidgetProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);

  const handleByCriticalityButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.TOP_ISSUES_WIDGET_BY_CRITICALITY_BUTTON_CLICKED
    );
    onGetIssuesByCriticality();
  };

  const handleBySeverityButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.TOP_ISSUES_WIDGET_BY_SEVERITY_BUTTON_CLICKED
    );
    onGetIssuesBySeverity();
  };

  const { data: about } = useGetAboutQuery();

  const isBySeverityButtonVisible = getFeatureFlagValue(
    about,
    FeatureFlag.IsInsightSeveritySortingEnabled
  );

  return (
    <OverviewWidget id={"top-issues"}>
      <s.Container>
        <s.Title>Top Issues</s.Title>
        <s.ButtonsContainer>
          <Tooltip
            placement={"bottom"}
            title={"A list of issues, ranked by their impact and urgency."}
          >
            <s.ByCriticalityButton
              onClick={handleByCriticalityButtonClick}
              className={"issues-button"}
              data-id={"criticality"}
            >
              <s.IconContainer>
                <MeterHighIcon size={16} color={"currentColor"} />
              </s.IconContainer>
              By Criticality
              <s.ChevronIconContainer>
                <ChevronIcon
                  size={20}
                  direction={Direction.Right}
                  color={"currentColor"}
                />
              </s.ChevronIconContainer>
            </s.ByCriticalityButton>
          </Tooltip>

          {isBySeverityButtonVisible && (
            <>
              <s.Divider
                src={`/assets/images/admin/home/overviewWidgetMetricsDivider_${themeKind}.svg`}
              />
              <Tooltip
                placement={"bottom"}
                title={"A list of issues, ranked by their severity level."}
              >
                <s.BySeverityButton
                  onClick={handleBySeverityButtonClick}
                  className={"issues-button"}
                  id={"severity"}
                >
                  <s.IconContainer>
                    <WarningTriangleIcon size={16} color={"currentColor"} />
                  </s.IconContainer>
                  By Severity
                  <s.ChevronIconContainer>
                    <ChevronIcon
                      size={20}
                      direction={Direction.Right}
                      color={"currentColor"}
                    />
                  </s.ChevronIconContainer>
                </s.BySeverityButton>
              </Tooltip>
            </>
          )}
        </s.ButtonsContainer>
      </s.Container>
    </OverviewWidget>
  );
};
