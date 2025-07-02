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
import { PauseIcon } from "../../common/icons/12px/PauseIcon";
import { LogoutIcon } from "../../common/icons/16px/LogoutIcon";
import { NewPopover } from "../../common/NewPopover";
import { NewButton } from "../../common/v3/NewButton";
import { Tooltip } from "../../common/v3/Tooltip";
import { MenuList } from "../../Navigation/common/MenuList";
import { Popup } from "../../Navigation/common/Popup";
import { trackingEvents } from "../tracking";
import * as s from "./styles";

const REFRESH_INTERVAL = 10 * 1000; // in milliseconds

const isIncidentActive = (incident: IncidentResponseItem): boolean =>
  incident.status === "active";

const isIncidentPending = (incident: IncidentResponseItem): boolean =>
  incident.status === "pending";

const linkButtons: { id: string; label: string; route: string }[] = [
  {
    id: "incidents",
    label: "Directives",
    route: "/incidents/directives"
  },
  {
    id: "template",
    label: "Template",
    route: "/incidents/template"
  }
];

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

  const handleLinkButtonClick = (id: string) => () => {
    sendUserActionTrackingEvent(trackingEvents.SIDEBAR_LINK_BUTTON_CLICKED, {
      id
    });

    const button = linkButtons.find((button) => button.id === id);

    if (!button) {
      return;
    }

    void navigate(button.route);
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

  const incidents = useMemo(() => data?.items ?? [], [data]);

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
        <s.IncidentsListHeader>
          <s.IncidentsListTitle>Incidents</s.IncidentsListTitle>
          <NewButton label={"Create"} onClick={handleCreateButtonClick} />
        </s.IncidentsListHeader>
        <s.IncidentsList>
          {incidents.map((incident) => (
            <s.IncidentItem
              key={incident.id}
              $isSelected={incident.id === incidentId}
              $isActive={isIncidentActive(incident)}
              onClick={handleIncidentListItemClick(incident.id)}
            >
              {isIncidentActive(incident) && <s.StyledPulsatingDot />}
              <Tooltip title={incident.name}>
                <s.IncidentItemTitle>{incident.name}</s.IncidentItemTitle>
              </Tooltip>
              {isIncidentPending(incident) && (
                <s.PauseIconContainer>
                  <PauseIcon color={"currentColor"} />
                </s.PauseIconContainer>
              )}
            </s.IncidentItem>
          ))}
        </s.IncidentsList>
      </s.IncidentsListContainer>
      {linkButtons.map((button) => {
        const isHighlighted = location.pathname === button.route;

        return (
          <s.LinkButton
            key={button.label}
            buttonType={isHighlighted ? "primary" : "secondary"}
            label={button.label}
            onClick={handleLinkButtonClick(button.id)}
          />
        );
      })}
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
