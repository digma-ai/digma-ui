import { usePostHog } from "posthog-js/react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { useTheme } from "styled-components";
import {
  useAgenticDispatch,
  useAgenticSelector
} from "../../../containers/Agentic/hooks";
import { useLogoutMutation } from "../../../redux/services/auth";
import { useGetIncidentsQuery } from "../../../redux/services/digma";
import type { IncidentResponseItem } from "../../../redux/services/types";
import { setIsCreateIncidentChatOpen } from "../../../redux/slices/incidentsSlice";
import { sendUserActionTrackingEvent } from "../../../utils/actions/sendUserActionTrackingEvent";
import { getThemeKind } from "../../common/App/styles";
import { LogoutIcon } from "../../common/icons/16px/LogoutIcon";
import { NewPopover } from "../../common/NewPopover";
import { NewButton } from "../../common/v3/NewButton";
import { Tooltip } from "../../common/v3/Tooltip";
import { MenuList } from "../../Navigation/common/MenuList";
import { Popup } from "../../Navigation/common/Popup";
import { trackingEvents } from "../tracking";
import * as s from "./styles";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const isIncidentActive = (incident: IncidentResponseItem): boolean => {
  return incident.active_status === "active";
};

export const Sidebar = () => {
  const theme = useTheme();
  const themeKind = getThemeKind(theme);
  const params = useParams();
  const incidentId = params.id;
  const navigate = useNavigate();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const posthog = usePostHog();
  const location = useLocation();
  const dispatch = useAgenticDispatch();

  const { data } = useGetIncidentsQuery(undefined, {
    pollingInterval: REFRESH_INTERVAL
  });

  const [logout, result] = useLogoutMutation();

  const handleLogoLinkClick = () => {
    sendUserActionTrackingEvent(trackingEvents.SIDEBAR_LOGO_LINK_CLICKED);
  };

  const handleIncidentListItemClick = (id: string) => () => {
    sendUserActionTrackingEvent(
      trackingEvents.SIDEBAR_INCIDENTS_LIST_ITEM_CLICKED
    );
    void navigate(`/incidents/${id}`);
  };

  const handleCreateButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.SIDEBAR_CREATE_BUTTON_CLICKED);
    dispatch(setIsCreateIncidentChatOpen(true));
  };

  const handleDirectivesButtonClick = () => {
    sendUserActionTrackingEvent(
      trackingEvents.SIDEBAR_DIRECTIVES_BUTTON_CLICKED
    );
    void navigate("/incidents/directives");
  };

  const handleTemplateButtonClick = () => {
    sendUserActionTrackingEvent(trackingEvents.SIDEBAR_TEMPLATE_BUTTON_CLICKED);
    void navigate("/incidents/template");
  };

  const handleLogoutMenuItemClick = () => {
    sendUserActionTrackingEvent(trackingEvents.SIDEBAR_USER_MENU_ITEM_CLICKED, {
      item: "logout"
    });
    void logout();
  };

  const handleUserMenuOpenChange = (isOpen: boolean) => {
    sendUserActionTrackingEvent(trackingEvents.SIDEBAR_USER_MENU_OPEN_CHANGED, {
      isOpen
    });
    setIsUserMenuOpen(isOpen);
  };

  useEffect(() => {
    let timeoutId: number | null = null;

    if (result.isSuccess) {
      if (posthog.__loaded) {
        posthog.reset();
      }
      timeoutId = window.setTimeout(() => {
        window.location.reload();
      }, 500);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [posthog, result.isSuccess]);

  const sortedIncidents = useMemo(
    () =>
      [...(data?.items ?? [])].sort(
        (a, b) =>
          new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf()
      ),
    [data]
  );

  const user = useAgenticSelector((state) => state.auth.user);
  const userInitial = (user?.email[0] ?? "").toLocaleUpperCase();
  const isTemplateButtonHighlighted =
    location.pathname === "/incidents/template";
  const isDirectivesButtonHighlighted =
    location.pathname === "/incidents/directives";

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
        <s.IncidentsListHeader>
          <s.IncidentsListTitle>Incidents</s.IncidentsListTitle>
          <NewButton label={"Create"} onClick={handleCreateButtonClick} />
        </s.IncidentsListHeader>
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
      <s.LinkButton
        buttonType={isDirectivesButtonHighlighted ? "primary" : "secondary"}
        label={"Directives"}
        onClick={handleDirectivesButtonClick}
      />
      <s.LinkButton
        buttonType={isTemplateButtonHighlighted ? "primary" : "secondary"}
        label={"Template"}
        onClick={handleTemplateButtonClick}
      />
      <NewPopover
        content={
          <Popup>
            <MenuList
              items={[
                {
                  id: "logout",
                  icon: <LogoutIcon size={16} color={"currentColor"} />,
                  label: "Log out",
                  onClick: handleLogoutMenuItemClick
                }
              ]}
            />
          </Popup>
        }
        onOpenChange={handleUserMenuOpenChange}
        isOpen={isUserMenuOpen}
        placement={"bottom-start"}
      >
        <s.UserInfo>
          <s.Avatar>{userInitial}</s.Avatar>
          {user?.email ?? ""}
        </s.UserInfo>
      </NewPopover>
    </s.Container>
  );
};
