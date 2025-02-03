import { useTheme } from "styled-components";
import { useAdminSelector } from "../../../../../containers/Admin/hooks";
import { getFeatureFlagValue } from "../../../../../featureFlags";
import { useGetAboutQuery } from "../../../../../redux/services/digma";
import { FeatureFlag } from "../../../../../types";
import { sendUserActionTrackingEvent } from "../../../../../utils/actions/sendUserActionTrackingEvent";
import { getThemeKind } from "../../../../common/App/styles";
import { WarningTriangleIcon } from "../../../../common/icons/12px/WarningTriangleIcon";
import { MeterHighIcon } from "../../../../common/icons/16px/MeterHighIcon";
import { ChevronIcon } from "../../../../common/icons/20px/ChevronIcon";
import { Direction } from "../../../../common/icons/types";
import { trackingEvents } from "../../../tracking";
import { OverviewWidget } from "../OverviewWidget";
import * as s from "./styles";
import type { TopIssuesWidgetProps } from "./types";

const ISSUES_LIMIT = 10;

export const TopIssuesWidget = ({ onGetIssues }: TopIssuesWidgetProps) => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);
  const environmentId = useAdminSelector((state) => state.scope.environmentId);

  const handleByCriticalityButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.TOP_ISSUES_WIDGET_BY_CRITICALITY_BUTTON_CLICKED
    );
    onGetIssues({
      query: {
        environment: environmentId ?? undefined
      },
      limit: ISSUES_LIMIT,
      title: "Top issues by criticality"
    });
  };

  const handleBySeverityButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.TOP_ISSUES_WIDGET_BY_SEVERITY_BUTTON_CLICKED
    );
    onGetIssues({
      query: {
        environment: environmentId ?? undefined,
        sortBy: "severity"
      },
      limit: ISSUES_LIMIT,
      title: "Top issues by severity"
    });
  };

  const { data: about } = useGetAboutQuery();

  const isBySeverityButtonVisible = Boolean(
    about &&
      getFeatureFlagValue(
        about,
        FeatureFlag.IS_INSIGHT_SEVERITY_SORTING_ENABLED
      )
  );

  return (
    <OverviewWidget>
      <s.Container>
        <s.Title>Top 10 Issues</s.Title>
        <s.ButtonsContainer>
          <s.ByCriticalityButton onClick={handleByCriticalityButtonClick}>
            <s.IconContainer>
              <MeterHighIcon size={16} color={"currentColor"} />
            </s.IconContainer>
            By Criticality
            <s.ChevronIconContainer>
              <ChevronIcon
                size={20}
                direction={Direction.RIGHT}
                color={"currentColor"}
              />
            </s.ChevronIconContainer>
          </s.ByCriticalityButton>
          {isBySeverityButtonVisible && (
            <>
              <s.Divider
                src={`/assets/images/admin/home/overviewWidgetMetricsDivider_${themeKind}.svg`}
              />
              <s.BySeverityButton onClick={handleBySeverityButtonClick}>
                <s.IconContainer>
                  <WarningTriangleIcon size={16} color={"currentColor"} />
                </s.IconContainer>
                By Severity
                <s.ChevronIconContainer>
                  <ChevronIcon
                    size={20}
                    direction={Direction.RIGHT}
                    color={"currentColor"}
                  />
                </s.ChevronIconContainer>
              </s.BySeverityButton>
            </>
          )}
        </s.ButtonsContainer>
      </s.Container>
    </OverviewWidget>
  );
};
