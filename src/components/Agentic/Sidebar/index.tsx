import { useEffect, useMemo } from "react";
import { useTheme } from "styled-components";
import {
  useAgenticDispatch,
  useAgenticSelector
} from "../../../containers/Agentic/hooks";
import { useGetIncidentsQuery } from "../../../redux/services/digma";
import type { IncidentResponseItem } from "../../../redux/services/types";
import { clear, setIncidentId } from "../../../redux/slices/incidentsSlice";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { getThemeKind } from "../../common/App/styles";
import { Tooltip } from "../../common/v3/Tooltip";
import { trackingEvents } from "../tracking";
import * as s from "./styles";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const isIncidentActive = (incident: IncidentResponseItem): boolean => {
  return incident.active_status === "active";
};

export const Sidebar = () => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);
  const { incidentId } = useAgenticSelector((state) => state.incidents);
  const dispatch = useAgenticDispatch();

  const { data } = useGetIncidentsQuery(undefined, {
    pollingInterval: REFRESH_INTERVAL
  });

  const handleLogoLinkClick = () => {
    sendUserActionTrackingEvent(trackingEvents.LOGO_LINK_CLICKED);
  };

  const handleIncidentListItemClick = (id: string) => () => {
    dispatch(clear());
    dispatch(setIncidentId(id));
  };

  const handleTemplateButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.TEMPLATE_BUTTON_CLICKED);
  };

  const sortedIncidents = useMemo(
    () =>
      [...(data?.items ?? [])].sort(
        (a, b) =>
          new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
      ),
    [data]
  );

  useEffect(() => {
    if (sortedIncidents.length > 0) {
      dispatch(setIncidentId(sortedIncidents[0].id));
    } else {
      dispatch(clear());
    }
  }, [sortedIncidents, dispatch]);

  const user = useAgenticSelector((state) => state.auth.user);
  const userInitial = (user?.email[0] ?? "").toLocaleUpperCase();

  return (
    <s.Container>
      <s.GradientBackground />
      <s.LogoLink to={"/"} onClick={handleLogoLinkClick}>
        <s.Logo
          src={`/assets/images/admin/digmaLogo_${themeKind}.svg`}
          alt={"Digma logotype"}
        />
      </s.LogoLink>
      <s.IncidentsListContainer>
        <s.IncidentsListTitle>Incidents</s.IncidentsListTitle>
        <s.IncidentsList>
          {sortedIncidents.map((incident) => (
            <s.IncidentItem
              key={incident.name}
              $isSelected={incident.id === incidentId}
              $isActive={isIncidentActive(incident)}
              onClick={handleIncidentListItemClick(incident.id)}
            >
              {isIncidentActive(incident) && <s.StyledPulsatingDot />}
              <Tooltip title={incident.name}>
                <s.IncidentItemTitle>{incident.name}</s.IncidentItemTitle>
              </Tooltip>
            </s.IncidentItem>
          ))}
        </s.IncidentsList>
      </s.IncidentsListContainer>
      <s.TemplateButton
        buttonType={"secondary"}
        label={"Template"}
        onClick={handleTemplateButtonClick}
        isDisabled={true}
      />
      <s.UserInfo>
        <s.Avatar>{userInitial}</s.Avatar>
        {user?.email ?? ""}
      </s.UserInfo>
    </s.Container>
  );
};
